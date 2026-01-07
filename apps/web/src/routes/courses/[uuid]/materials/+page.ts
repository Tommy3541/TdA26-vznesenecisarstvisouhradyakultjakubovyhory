export const load = async ({ fetch, params }) => {
    // Přidejte /api/ do cesty
    const res = await fetch(`/courses/${params.uuid}/materials/api`);
    if (res.ok) {
        const materials = await res.json();
        return { materials };
    }
    return { materials: [] };
};
