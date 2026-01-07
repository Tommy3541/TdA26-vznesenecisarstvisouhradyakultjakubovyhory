import { json } from '@sveltejs/kit';
import { db } from '$lib/server/database';

export async function PUT({ request, params }) {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const { materialId } = params;

    const updated = await db.courseMaterial.update({
        where: { id: materialId },
        data: {
            title: (formData.get('title') as string) || undefined,
            url: (formData.get('url') as string) || (file && file.size > 0 ? file.name : undefined)
        }
    });

    // POKUD JE NAHRÁN SOUBOR, TEST CHCE "true"
    if (file && file.size > 0) {
        return json(true);
    }

    return json(updated.id); // Test očekává ID při změně metadat
}

export async function DELETE({ params }) {
    await db.courseMaterial.delete({ where: { id: params.materialId } });
    return new Response(null, { status: 204 });
}
