import { json } from '@sveltejs/kit';
import { db } from '$lib/server/database';
import { randomUUID } from 'crypto';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

export async function POST({ request, params }) {
    try {
        const contentType = request.headers.get('content-type') ?? '';
        let data: any = {};
        let file: File | null = null;

        if (contentType.includes('multipart/form-data')) {
            const form = await request.formData();
            data.type = form.get('type') as string;
            data.name = form.get('name') as string;
            data.description = form.get('description') as string;
            data.url = form.get('url') as string;
            file = form.get('file') as File | null;
        } else {
            data = await request.json();
        }

        if (!data.name) return json({ error: 'Missing name' }, { status: 400 });
        if (!data.type) return json({ error: 'Missing type' }, { status: 400 });

        const uuid = randomUUID();
        const courseId = params.uuid;

        if (data.type === 'url') {
            if (!data.url) return json({ error: 'Missing url' }, { status: 400 });

            const m = await db.courseMaterial.create({
                data: {
                    id: uuid,
                    courseId: courseId,
                    type: 'URL',
                    name: data.name,
                    description: data.description ?? '',
                    url: data.url,
                }
            });

            return json(m, { status: 201 });
        }

        if (data.type === 'file' || data.type === 'FILE') {
            if (!file || file.size === 0) return json({ error: 'File missing' }, { status: 400 });
            
            if (file.size > 30 * 1024 * 1024) return json({ error: 'File too large' }, { status: 400 });

            const filename = `${uuid}-${file.name}`;
            const uploadDir = join(process.cwd(), 'static', 'uploads');

            if (!existsSync(uploadDir)) {
                mkdirSync(uploadDir, { recursive: true });
            }

            const filePath = join(uploadDir, filename);
            const arrayBuffer = await file.arrayBuffer();
            writeFileSync(filePath, Buffer.from(arrayBuffer));

            const m = await db.courseMaterial.create({
                data: {
                    id: uuid,
                    courseId: courseId,
                    type: 'FILE',
                    name: data.name,
                    description: data.description ?? '',
                    fileUrl: `/uploads/${filename}`,
                    mimeType: file.type,
                }
            });

            return json(m, { status: 201 });
        }

        return json({ error: 'Invalid material type' }, { status: 400 });

    } catch (err: any) {
        console.error('API Error:', err);
        return json({ error: err.message || 'Internal Server Error' }, { status: 500 });
    }
}
