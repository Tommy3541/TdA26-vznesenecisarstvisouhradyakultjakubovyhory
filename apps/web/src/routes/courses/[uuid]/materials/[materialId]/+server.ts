
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/database';

export async function PUT({ request, params }) {
  const contentType = request.headers.get('content-type') ?? '';
  let data: any = {};
  let file: File | null = null;

  if (contentType.includes('multipart/form-data')) {
    const form = await request.formData();
    data.name = form.get('name');
    data.description = form.get('description');
    file = form.get('file') as File;
  } else {
    data = await request.json();
  }

  const updated = await db.courseMaterial.update({
    where: { id: params.materialId },
    data: {
      name: data.name ?? undefined,
      description: data.description ?? undefined,
      ...(file && file.size > 0
        ? { fileUrl: `/uploads/${file.name}`, mimeType: file.type }
        : {})
    }
  });

  return json({
    uuid: updated.id,
    type: updated.type === 'URL' ? 'url' : 'file',
    name: updated.name,
    description: updated.description,
    ...(updated.type === 'URL'
      ? { url: updated.url }
      : { fileUrl: updated.fileUrl, mimeType: updated.mimeType })
  });
}

export async function DELETE({ params }) {
  await db.courseMaterial.delete({
    where: { id: params.materialId }
  });

  return new Response(null, { status: 204 });
}
