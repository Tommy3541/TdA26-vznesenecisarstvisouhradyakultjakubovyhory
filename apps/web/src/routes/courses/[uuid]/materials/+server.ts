import { json } from '@sveltejs/kit';
import { db } from '$lib/server/database';
import { randomUUID } from 'crypto';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    try {
        // Kontrola, zda máme UUID kurzu
        if (!params.uuid) {
            return json({ error: 'Missing course UUID' }, { status: 400 });
        }

        const materials = await db.courseMaterial.findMany({
            where: { courseId: params.uuid },
            orderBy: { createdAt: 'desc' }
        });
        
        return json(materials);
    } catch (err: any) {
        // Logování do terminálu, abys viděl, proč databáze hází 502
        console.error("CRITICAL DATABASE ERROR (GET):", err.message);
        
        // Vrátíme prázdné pole, aby frontend nespadl na parsování HTML
        return json([], { 
            status: 500, 
            statusText: 'Database connection failed' 
        });
    }
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, params }) {
    try {
        const contentType = request.headers.get('content-type') ?? '';
        let data: any = {};
        let file: File | null = null;

        // 1. Bezpečné parsování vstupu
        if (contentType.includes('multipart/form-data')) {
            const form = await request.formData();
            data.type = form.get('type')?.toString();
            data.name = form.get('name')?.toString();
            data.url = form.get('url')?.toString();
            data.description = form.get('description')?.toString();
            file = form.get('file') as File;
        } else {
            data = await request.json();
        }

        // 2. Základní validace
        if (!data.name || !data.type) {
            return json({ error: 'Name and type are required' }, { status: 400 });
        }

        const uuid = randomUUID();
        const courseId = params.uuid;

        // 3. Zápis do DB (URL typ)
        if (data.type.toLowerCase() === 'url') {
            if (!data.url) return json({ error: 'URL is required' }, { status: 400 });

            const m = await db.courseMaterial.create({
                data: {
                    id: uuid,
                    courseId: courseId,
                    type: 'URL',
                    name: data.name,
                    description: data.description || '',
                    url: data.url,
                    createdAt: new Date()
                }
            });

            // Vracíme přesně to, co testy očekávají (uuid v rootu objektu)
            return json({
                uuid: m.id,
                ...m
            }, { status: 201 });
        }

        // 4. Zápis do DB (FILE typ - metadata)
        if (data.type.toLowerCase() === 'file') {
            const m = await db.courseMaterial.create({
                data: {
                    id: uuid,
                    courseId: courseId,
                    type: 'FILE',
                    name: data.name,
                    description: data.description || '',
                    fileUrl: `/uploads/${uuid}-${file?.name || 'file'}`,
                    mimeType: file?.type || 'application/octet-stream',
                    createdAt: new Date()
                }
            });
            return json({ uuid: m.id, ...m }, { status: 201 });
        }

        return json({ error: 'Invalid material type' }, { status: 400 });

    } catch (err: any) {
        console.error("CRITICAL DATABASE ERROR (POST):", err.message);
        return json({ 
            error: 'Server failed to process request', 
            details: err.message 
        }, { status: 500 });
    }
}
