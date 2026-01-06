import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    try {
        const response = await fetch('/api/courses');
        
        if (!response.ok) {
            console.error("API vrátilo chybu:", response.status);
            return { courses: [] };
        }
        
        const result = await response.json();

        // Tato logika zajistí, že dostaneme pole, i když ho API zabalí do objektu
        const courses = Array.isArray(result) ? result : (result.courses || []);

        return { courses };
    } catch (err) {
        console.error("Chyba při načítání kurzů:", err);
        return { courses: [] };
    }
};