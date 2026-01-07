export const load = async ({ fetch, params }) => {
    // Odstraňte '/api', protože vaše routy jsou přímo v /courses
    const res = await fetch(`/courses/${params.uuid}/materials`);
    if (res.ok) {
        const materials = await res.json();
        return { materials };
    }
    return { materials: [] };
};
