import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    try {
        const response = await fetch('/api/courses');
        if (!response.ok) return { courses: [] };
        
        const courses = await response.json();
        return { courses };
    } catch (err) {
        console.error("Chyba při načítání kurzů:", err);
        return { courses: [] };
    }
};