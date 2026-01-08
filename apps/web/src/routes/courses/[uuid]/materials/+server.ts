import { json } from '@sveltejs/kit';
import { db } from '$lib/server/database';
import { randomUUID } from 'crypto';

// TATO FUNKCE CHYBĚLA - bez ní vyhazuje +page.ts chybu SyntaxError (protože dostane HTML 405)
export async function GET({ params }) {
    try {
        const materials = await db.courseMaterial.findMany({
            where: { courseId: params.uuid }
        });
        return json(materials);
    } catch (err) {
        return json([], { status: 500 });
    }
}

export async function POST({ request, params }) {
    try {
        const contentType = request.headers.get('content-type') ?? '';
        let data: any = {};
        let file: File | null = null;

        if (contentType.includes('multipart/form-data')) {
            const form = await request.formData();
            data.type = form.get('type');
            data.name = form.get('name');
            data.url = form.get('url');
            file = form.get('file') as File;
        } else {
            data = await request.json();
        }

        const uuid = randomUUID();

        // Ujisti se, že params.uuid existuje (odpovídá složce [uuid])
        const courseId = params.uuid;

        if (data.type === 'url') {
            const m = await db.courseMaterial.create({
                data: {
                    id: uuid,
                    courseId: courseId,
                    type: 'URL',
                    name: data.name,
                    url: data.url,
                }
            });
            // VRACÍME OBJEKT S UUID - toto opraví tvůj test "Actual: undefined"
            return json({ uuid: m.id, ...m }, { status: 201 });
        }

        // Pro testy URL materiálu stačí toto, pro soubory by se přidala logika uložení
        return json({ error: 'Unsupported type' }, { status: 400 });

    } catch (err: any) {
        console.error("POST ERROR:", err);
        return json({ error: 'Server error' }, { status: 500 });
    }
}
