export const load = async ({ fetch, params }) => {  
  const res = await fetch(/courses/${params.uuid}/materials);
  if (res.ok) { 
    const materials = await res.json(); 
    return { materials }; 
  } 
  return { materials: [] }; 
};
