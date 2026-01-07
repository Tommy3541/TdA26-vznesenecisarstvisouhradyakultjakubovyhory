import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/database';

/* ===================== GET COURSE DETAIL ===================== */
export async function GET({ params }) {
  console.log('🔥 COURSE DETAIL HIT');
  const course = await db.course.findUnique({
    where: { id: params.uuid },
    include: {
      materials: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!course) {
    throw error(404, 'Course not found');
  }

  return json({
    uuid: course.id,
    name: course.name,
    description: course.description,
    materials: course.materials.map(m => ({
      uuid: m.id,
      type: m.type === 'URL' ? 'url' : 'file',
      name: m.name,
      description: m.description,
      ...(m.type === 'URL'
        ? { url: m.url }
        : { fileUrl: m.fileUrl, mimeType: m.mimeType })
    }))
  });
}
