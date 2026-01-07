export async function POST({ params, request }) {
    const { uuid } = params; // ID kurzu
    const data = await request.formData();
    
    // Logika uložení do DB...
    const newMaterial = await db.courseMaterial.create({
        data: {
            // ... data
            courseId: uuid
        }
    });

    // Zásadní pro testy: Vraťte UUID nového materiálu
    return new Response(JSON.stringify(newMaterial), { status: 201 });
}
