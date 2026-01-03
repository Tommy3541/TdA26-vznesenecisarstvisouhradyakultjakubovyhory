import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, fetch }) => {
    // API volání musí odpovídat vaší backendové routě, která v testu prošla
    const res = await fetch(`/api/courses/${params.courseId}`);
    
    if (!res.ok) {
        throw error(res.status, 'Course not found');
    }

    const course = await res.json();
    return { course };
};
