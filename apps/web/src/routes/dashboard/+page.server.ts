import { db } from '$lib/server/database';
import { fail } from '@sveltejs/kit';

export const load = async ({ params }) => {
    const course = await db.course.findUnique({
        where: { id: params.uuid }
    });

    const materials = await db.courseMaterial.findMany({
        where: { courseId: params.uuid },
        orderBy: { createdAt: 'desc' }
    });

    return { course, materials };
};

export const actions = {
    uploadFile: async ({ request, params }) => {
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const file = formData.get('file') as File;

        if (!title || !file) {
            return fail(400, { message: 'Název a soubor jsou povinné' });
        }

        const material = await db.courseMaterial.create({
            data: {
                title,
                description,
                type: 'FILE',
                url: file.name,
                courseId: params.uuid
            }
        });

        return { material };
    },

    uploadLink: async ({ request, params }) => {
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const url = formData.get('url') as string;
        const description = formData.get('description') as string;

        if (!title || !url) {
            return fail(400, { message: 'Název a URL jsou povinné' });
        }

        const material = await db.courseMaterial.create({
            data: {
                title,
                url,
                description,
                type: 'LINK',
                courseId: params.uuid
            }
        });

        return { material };
    }
};

