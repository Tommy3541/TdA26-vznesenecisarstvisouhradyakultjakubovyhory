import { db } from '$lib/server/database'; // Ujisti se, že tento soubor už existuje!
import { fail } from '@sveltejs/kit';

export const actions = {
    uploadFile: async ({ request, params }) => {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;

        if (!file || file.size === 0) return fail(400, { message: 'Soubor chybí' });

        // Tady bys normálně soubor uložil na disk nebo do S3
        // Pro teď jen zapíšeme záznam do DB
        await db.courseMaterial.create({
            data: {
                title,
                description,
                type: 'FILE',
                url: `/uploads/${file.name}`, // Cesta, kam soubor uložíš
                courseId: params.id // ID kurzu z URL
            }
        });
    },

    uploadLink: async ({ request, params }) => {
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const url = formData.get('url') as string;
        const description = formData.get('description') as string;

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
