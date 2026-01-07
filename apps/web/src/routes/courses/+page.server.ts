import { db } from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    try {
        // V tabulce máš sloupce uuid, name, description
        const courses = await db.course.findMany(); 
        return { 
            // SvelteKit někdy blbne s proxy objekty z DB, tohle je "vyčistí"
            courses: JSON.parse(JSON.stringify(courses)) 
        };
    } catch (err) {
        console.error("Chyba DB:", err);
        return { courses: [] };
    }
};