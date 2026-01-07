import { db } from '$lib/server/database';
import { fail } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';

export const load = async ({ params }) => {
    // V URL máš [id], což je UUID kurzu
    const course = await db.course.findUnique({ where: { uuid: params.id } });
    const materials = await db.material.findMany({ where: { course_uuid: params.id } });
    
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
                    name: title,           // Změna: title -> name
                    description: description,
                    type: 'file',          // Změna: FILE -> file (podle ENUM v init.ts)
                    content: file.name,    // Změna: url -> content
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
                    name: title,          // Změna: title -> name
                    description: description,
                    type: 'url',          // Změna: LINK -> url
                    content: url          // Změna: url -> content
                }
            });
            return { success: true };
        } catch (err) {
            console.error(err);
            return fail(500, { message: 'Chyba databáze' });
        }
    }
};