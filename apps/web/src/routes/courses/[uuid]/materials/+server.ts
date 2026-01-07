import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/database';
import { randomUUID } from 'crypto';

/* ===================== GET ===================== */
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

/* ===================== POST ===================== */
export async function POST({ request, params }) {
  const contentType = request.headers.get('content-type') ?? '';
  let data: any = {};
  let file: File | null = null;

  if (contentType.includes('multipart/form-data')) {
    const form = await request.formData();
    data.type = form.get('type');
    data.name = form.get('name');
    data.description = form.get('description');
    file = form.get('file') as File;
  } else {
    data = await request.json();
  }

  const uuid = randomUUID();

  // URL MATERIAL
  if (data.type === 'url') {
    const m = await db.courseMaterial.create({
      data: {
        id: uuid,
        courseId: params.uuid,
        type: 'URL',
        name: data.name,
        description: data.description ?? '',
        url: data.url,
        createdAt: new Date()
      }
    });

    return json({
      uuid: m.id,
      type: 'url',
      name: m.name,
      description: m.description,
      url: m.url
    }, { status: 201 });
  }

  // FILE MATERIAL
  if (!file || file.size === 0) throw error(400, 'File missing');
  if (file.size > 30 * 1024 * 1024) throw error(400, 'File too large');

  const allowed = [
    'application/pdf',
    'image/png',
    'image/jpeg',
    'image/gif',
    'text/plain',
    'audio/mpeg',
    'video/mp4',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (!allowed.includes(file.type)) {
    throw error(400, 'Unsupported file type');
  }

  const m = await db.courseMaterial.create({
    data: {
      id: uuid,
      courseId: params.uuid,
      type: 'FILE',
      name: data.name,
      description: data.description ?? '',
      fileUrl: `/uploads/${file.name}`,
      mimeType: file.type,
      createdAt: new Date()
    }
  });

  return json({
    uuid: m.id,
    type: 'file',
    name: m.name,
    description: m.description,
    fileUrl: m.fileUrl,
    mimeType: m.mimeType
  }, { status: 201 });
}

