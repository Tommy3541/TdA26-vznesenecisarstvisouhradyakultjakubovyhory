import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
// Importuj svůj databázový klient (např. Prisma nebo db helper)
import { db } from '$lib/server/database'; 

export const load: LayoutServerLoad = async ({ params }) => {
    const { id } = params; // Toto ID musí být UUID

    const course = await db.course.findUnique({
        where: { id: id }
    });

    if (!course) {
        throw error(404, 'Kurz nenalezen');
    }

    // Načtení podkladů: od nejnovějšího po nejstarší
    const materials = await db.courseMaterial.findMany({
        where: { courseId: id },
        orderBy: { createdAt: 'desc' } 
    });

    return {
        course,
        materials
    };
};
