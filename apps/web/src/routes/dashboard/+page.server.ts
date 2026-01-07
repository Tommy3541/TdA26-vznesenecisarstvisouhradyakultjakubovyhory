import { db } from '$lib/server/database';
import { fail } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';

export const load = async ({ params }) => {
    // Pozor: pokud máš složku [id], params.id je správně. 
    // Pokud ji máš pojmenovanou jinak, změň id na název té složky.
    const course = await db.course.findUnique({ where: { uuid: params.id } });
    const materials = await db.material.findMany({ where: { course_uuid: params.id } });
    
    if (!course) {
        return { course: { title: 'Kurz nenalezen' }, materials: [] };
    }

    return { course, materials };
};

export const actions = {
    uploadFile: async ({ request, params }) => {
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const file = formData.get('file') as File;

        if (!title || !file) return fail(400, { message: 'Název a soubor jsou povinné' });

        try {
            await db.material.create({
                data: {
                    uuid: uuidv4(),
                    course_uuid: params.id,
                    name: title,
                    description: description,
                    type: 'file',
                    content: file.name, // Tady by se v reálu soubor ukládal na disk/S3
                    mime_type: file.type
                }
            });
            return { success: true };
        } catch (err) {
            console.error(err);
            return fail(500, { message: 'Chyba databáze' });
        }
    },
    uploadLink: async ({ request, params }) => {
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const url = formData.get('url') as string;
        const description = formData.get('description') as string;

        if (!title || !url) return fail(400, { message: 'Název a URL jsou povinné' });

        try {
            await db.material.create({
                data: {
                    uuid: uuidv4(),
                    course_uuid: params.id,
                    name: title,
                    description: description,
                    type: 'url',
                    content: url
                }
            });
            return { success: true };
        } catch (err) {
            console.error(err);
            return fail(500, { message: 'Chyba databáze' });
        }
    }
};