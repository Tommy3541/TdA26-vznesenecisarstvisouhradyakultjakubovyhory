import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  const res = await fetch(`/courses/${params.uuid}/materials`);
  const materials = res.ok ? await res.json() : [];

  return { materials };
};
