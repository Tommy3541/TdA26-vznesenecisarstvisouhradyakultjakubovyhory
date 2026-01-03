export const load = async ({ fetch, params }) => {
    const res = await fetch(`/api/courses/${params.courseId}`); // Detail kurzu
    const course = await res.json();
    return { course };
};
