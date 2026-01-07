// Upravte metodu POST v tomto souboru
export async function POST({ request, params }) {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const url = formData.get('url') as string;
    const file = formData.get('file') as File;

    if (file && file.size > 30 * 1024 * 1024) return new Response(null, { status: 413 });

    const newMaterial = await db.courseMaterial.create({
        data: {
            title: title || (file ? file.name : 'Untitled'),
            description: description || '',
            type: url ? 'LINK' : 'FILE',
            url: url || (file ? file.name : ''),
            courseId: params.uuid
        }
    });

    // TESTY OČEKÁVAJÍ: 'name', 'description' a 'uuid'
    return json({
        uuid: newMaterial.id,      // Testy chtějí uuid
        name: newMaterial.title,   // Testy chtějí name místo title
        description: newMaterial.description,
        type: newMaterial.type === 'LINK' ? 'url' : 'file', // Test chce "url" pro LINK
        url: newMaterial.url
    }, { status: 201 });
}
