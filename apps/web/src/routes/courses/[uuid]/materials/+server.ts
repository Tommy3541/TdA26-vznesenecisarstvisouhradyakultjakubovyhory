import { json } from '@sveltejs/kit';
import { db } from '$lib/server/database';

export async function POST({ request, params }) {
    const formData = await request.formData();
    const material = await db.courseMaterial.create({
        data: {
            title: String(formData.get('title')),
            description: String(formData.get('description') || ''),
            url: String(formData.get('url') || (formData.get('file') as File)?.name || ''),
            type: formData.get('url') ? 'LINK' : 'FILE',
            courseId: params.uuid
        }
    });

    // TESTY VYŽADUJÍ uuid A name
    return json({
        uuid: material.id,
        name: material.title,
        description: material.description,
        type: material.type === 'LINK' ? 'url' : 'file'
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
