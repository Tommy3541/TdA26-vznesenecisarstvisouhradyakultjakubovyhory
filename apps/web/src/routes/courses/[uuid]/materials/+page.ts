import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  const res = await fetch(`/courses/${params.uuid}/materials`);

  if (!res.ok) {
    return { materials: [] };
  }

  const materials = await res.json();

  return {
    materials
  };
};
