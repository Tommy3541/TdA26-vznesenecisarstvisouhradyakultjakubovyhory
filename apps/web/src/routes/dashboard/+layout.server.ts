import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
// Importuj svůj databázový klient (např. Prisma nebo db helper)
import { db } from '$lib/server/database'; 

export const load: LayoutServerLoad = async ({ params }) => {
    const { uuid } = params; // Toto ID musí být UUID, odpovídá složce [uuid]

    const course = await db.course.findUnique({
        where: { id: uuid }
    });

    if (!course) {
        throw error(404, 'Kurz nenalezen');
    }

    // Načtení podkladů: od nejnovějšího po nejstarší
    const materials = await db.courseMaterial.findMany({
        // TADY BYLA CHYBA: Musí zde být 'uuid', nikoliv 'id'
        where: { courseId: uuid }, 
        orderBy: { createdAt: 'desc' } 
    });

    return {
        course,
        materials
    };
};
