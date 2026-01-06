import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
    const res = await fetch(`/api/courses/${params.uuid}`);
    if (res.ok) {
        const course = await res.json();
        return { course };
    }
    return { status: 404, error: 'Kurz nenalezen' };
};