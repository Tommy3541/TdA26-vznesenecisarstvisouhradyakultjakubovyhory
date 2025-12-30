import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    const response = await fetch('/api/courses');
    const courses = await response.json();
    return { courses };
};