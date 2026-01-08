import { json } from '@sveltejs/kit';
import { db } from '$lib/server/database';
import { randomUUID } from 'crypto';

export async function GET({ params }) {
    const items = await db.courseMaterial.findMany({
        where: { courseId: params.uuid }
    });
    return json(items);
}

export async function POST({ request, params }) {
    try {
        const contentType = request.headers.get('content-type') ?? '';
        let data: any = {};

        if (contentType.includes('multipart/form-data')) {
            const form = await request.formData();
            data = {
                type: form.get('type')?.toString().toLowerCase(),
                name: form.get('name')?.toString(),
                url: form.get('url')?.toString()
            };
        } else {
            data = await request.json();
            if (data.type) data.type = data.type.toLowerCase();
        }

        const m = await db.courseMaterial.create({
            data: {
                id: randomUUID(),
                courseId: params.uuid,
                type: data.type === 'url' ? 'URL' : 'FILE',
                name: data.name,
                url: data.url || ''
            }
        });

        // KLÍČOVÉ PRO TEST: Musí vracet uuid
        return json({ ...m, uuid: m.id }, { status: 201 });
    } catch (err) {
        return json({ error: 'Server error' }, { status: 500 });
    }
}
