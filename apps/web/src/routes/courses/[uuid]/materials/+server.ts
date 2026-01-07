import { json } from '@sveltejs/kit';
import { db } from '$lib/server/database';

export async function POST({ request, params }) {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const url = formData.get('url') as string;
    const file = formData.get('file') as File;

    // Validace pro test "reject file larger than 30MB"
    if (file && file.size > 30 * 1024 * 1024) {
        return new Response(null, { status: 413 });
    }

    const newMaterial = await db.courseMaterial.create({
        data: {
            title: title || (file ? file.name : 'Untitled'),
            description: description || '',
            type: url ? 'LINK' : 'FILE',
            url: url || (file ? file.name : ''),
            courseId: params.uuid
        }
    });

    // MAPOVÁNÍ PRO TESTY:
    return json({
        uuid: newMaterial.id,       // Testy vyžadují klíč 'uuid'
        name: newMaterial.title,    // Testy vyžadují klíč 'name'
        description: newMaterial.description,
        type: url ? 'url' : 'file', // Testy očekávají malá písmena
        url: newMaterial.url
    }, { status: 201 });
}
