import { db } from '$lib/server/database';
import { fail } from '@sveltejs/kit';

export const load = async ({ params }) => {
    const course = await db.course.findUnique({ where: { id: params.uuid } });
    const materials = await db.courseMaterial.findMany({ where: { courseId: params.uuid } });
    return { course, materials };
};

export const actions = {
    uploadFile: async ({ request, params }) => {
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const file = formData.get('file') as File;

        if (!title || !file) return fail(400, { message: 'Název a soubor jsou povinné' });

        await db.courseMaterial.create({
            data: {
                title,
                description,
                type: 'FILE',
                url: file.name, // V reálné aplikaci bys zde soubor uložil na disk/S3
                courseId: params.id
            }
        });
    },
    uploadLink: async ({ request, params }) => {
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const url = formData.get('url') as string;
        const description = formData.get('description') as string;

        if (!title || !url) return fail(400, { message: 'Název a URL jsou povinné' });

        await db.courseMaterial.create({
            data: {
                title,
                url,
                description,
                type: 'LINK',
                courseId: params.id
            }
        });
    }
};
