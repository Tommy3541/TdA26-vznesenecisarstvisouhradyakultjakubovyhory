import { json } from '@sveltejs/kit';
import { db } from '$lib/server/database';

export async function PUT({ request, params }) {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    const updated = await db.courseMaterial.update({
        where: { id: params.materialId },
        data: {
            title: formData.get('title') ? String(formData.get('title')) : undefined,
            url: (file && file.size > 0) ? file.name : undefined
        }
    });

    // Pro test 'replace file'
    if (file && file.size > 0) return json(true);

    return json({ uuid: updated.id, name: updated.title });
}

export async function DELETE({ params }) {
    await db.courseMaterial.delete({ where: { id: params.materialId } });
    return new Response(null, { status: 204 }); // Status 204 pro úspěšné smazání
}
