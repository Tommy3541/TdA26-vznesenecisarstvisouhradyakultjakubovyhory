export async function GET({ params }) {
  const materials = await db.courseMaterial.findMany({
    where: { courseId: params.uuid },
    orderBy: { createdAt: 'desc' }
  });

  return json(materials.map(m => ({
    uuid: m.id,
    type: m.type === 'URL' ? 'url' : 'file',
    name: m.name,
    description: m.description,
    ...(m.type === 'URL'
      ? { url: m.url }
      : { fileUrl: m.fileUrl, mimeType: m.mimeType })
  })));
}
