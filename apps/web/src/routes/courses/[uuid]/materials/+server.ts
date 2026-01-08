import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/database';
import { randomUUID } from 'crypto';

console.log('Payload:', data)

export async function POST({ request, params }) {
    const contentType = request.headers.get('content-type') ?? '';
    let data: any = {};
    let file: File | null = null;

    // načtení requestu
    if (contentType.includes('multipart/form-data')) {
        const form = await request.formData();
        data.type = (form.get('type') as string) || '';
        data.name = (form.get('name') as string) || '';
        data.description = (form.get('description') as string) || '';
        file = form.get('file') as File | null;
        data.url = (form.get('url') as string) || '';
    } else {
        data = await request.json();
    }

    // validace
    if (!data.name) throw error(400, 'Missing name');
    if (!data.type) throw error(400, 'Missing type');

    const uuid = randomUUID();

    // URL materiál
    if (data.type === 'url') {
        if (!data.url) throw error(400, 'Missing url');
        const m = await db.courseMaterial.create({
            data: {
                id: uuid,
                courseId: params.uuid,
                type: 'URL',
                name: data.name,
                description: data.description ?? '',
                url: data.url,
                createdAt: new Date()
            }
        });

        return json({
            uuid: m.id,
            type: 'url',
            name: m.name,
            description: m.description,
            url: m.url
        }, { status: 201 });
    }

    // FILE materiál
    if (!file || file.size === 0) throw error(400, 'File missing');
    if (file.size > 30 * 1024 * 1024) throw error(400, 'File too large');

    const allowed = [
        'application/pdf',
        'image/png',
        'image/jpeg',
        'image/gif',
        'text/plain',
        'audio/mpeg',
        'video/mp4',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (!allowed.includes(file.type)) throw error(400, 'Unsupported file type');

    // vytvoření unikátního názvu souboru
    const filename = `${uuid}-${file.name}`;

    const m = await db.courseMaterial.create({
        data: {
            id: uuid,
            courseId: params.uuid,
            type: 'FILE',
            name: data.name,
            description: data.description ?? '',
            fileUrl: `/uploads/${filename}`,
            mimeType: file.type,
            createdAt: new Date()
        }
    });

    return json({
        uuid: m.id,
        type: 'file',
        name: m.name,
        description: m.description,
        fileUrl: m.fileUrl,
        mimeType: m.mimeType
    }, { status: 201 });
}

