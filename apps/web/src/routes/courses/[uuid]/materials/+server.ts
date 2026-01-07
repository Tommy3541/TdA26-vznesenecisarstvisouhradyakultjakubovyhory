import { json } from '@sveltejs/kit';
import { db } from '$lib/server/database';

export async function POST({ request, params }) {
    const formData = await request.formData();
    const material = await db.courseMaterial.create({
        data: {
            title: String(formData.get('title')),
            description: String(formData.get('description') || ''),
            url: String(formData.get('url') || (formData.get('file') as File)?.name),
            type: formData.get('url') ? 'LINK' : 'FILE',
            courseId: params.uuid
        }
    });

    // PŘESNÉ MAPOVÁNÍ PRO TESTY
    return json({
        uuid: material.id,        // Test chce 'uuid'
        name: material.title,     // Test chce 'name'
        description: material.description,
        type: material.type === 'LINK' ? 'url' : 'file'
    }, { status: 201 });
}

export async function GET({ params }) {
    const materials = await db.courseMaterial.findMany({
        where: { courseId: params.uuid },
        orderBy: { createdAt: 'desc' }
    });
    return json(materials);
}
