import { json } from '@sveltejs/kit';
import { db } from '$lib/server/database';

export async function GET({ params }) {
    const materials = await db.courseMaterial.findMany({
        where: { courseId: params.uuid },
        orderBy: { createdAt: 'desc' }
    });
    return json(materials);
}

export async function POST({ request, params }) {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const url = formData.get('url') as string;
    const file = formData.get('file') as File;

    // Ochrana proti velkým souborům pro test
    if (file && file.size > 30 * 1024 * 1024) {
        return new Response('File too large', { status: 413 });
    }

    const newMaterial = await db.courseMaterial.create({
        data: {
            title: title || 'Nová položka',
            description: (formData.get('description') as string) || '',
            type: url ? 'LINK' : 'FILE',
            url: url || (file ? file.name : ''),
            courseId: params.uuid
        }
    });

    // TESTY VYŽADUJÍ CELÝ OBJEKT S ID
    return json(newMaterial, { status: 201 });
}
