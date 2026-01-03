import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  const { courseId } = params;
  
  // Zavolá vaše API pro získání detailu
  const res = await fetch(`/api/courses/${courseId}`); 
  
  if (!res.ok) {
    return { status: 404, error: 'Kurz nenalezen' };
  }

  const course = await res.json();
  return { course };
};
