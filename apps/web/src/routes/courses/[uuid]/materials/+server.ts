import { json } from '@sveltejs/kit';
import { db } from '$lib/server/database';

export async function POST({ request, params }) {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const url = formData.get('url') as string;
    const file = formData.get('file') as File;

    // Ochrana velikosti pro testy
    if (file && file.size > 30 * 1024 * 1024) return new Response(null, { status: 413 });

    const material = await db.courseMaterial.create({
        data: {
            title: title || (file ? file.name : 'Untitled'),
            description: description || '',
            type: url ? 'LINK' : 'FILE',
            url: url || (file ? file.name : ''),
            courseId: params.uuid
        }
    });

    // TATO ODPOVĚĎ JE KLÍČOVÁ PRO TESTY (mapování id -> uuid)
    return json({
        uuid: material.id,          //
        name: material.title,       //
        description: material.description,
        type: url ? 'url' : 'file'
    }, { status: 201 });
}

export async function GET({ params }) {
    const materials = await db.courseMaterial.findMany({
        where: { courseId: params.uuid },
        orderBy: { createdAt: 'desc' }
    });
    return json(materials.map(m => ({
        uuid: m.id,
        name: m.title,
        type: m.type === 'LINK' ? 'url' : 'file'
    })));
}
