import { NextRequest, NextResponse } from 'next/server';
import { uploadBufferToCloudinary } from '@/lib/cloudinary';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'jcreative';

    if (!file) {
      return NextResponse.json(
        { error: 'Tidak ada file gambar yang diunggah' },
        { status: 400 }
      );
    }

    // Validate mime type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File harus berupa gambar (JPG, PNG, WEBP, dll)' },
        { status: 400 }
      );
    }

    // Check size limit (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Ukuran file maksimal adalah 10MB' },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const result = await uploadBufferToCloudinary(buffer, folder, file.type || 'image/jpeg');

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      secure_url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
      created_at: result.created_at,
    });
  } catch (error: any) {
    console.error('Upload to Cloudinary failed:', error);
    return NextResponse.json(
      { error: error?.message || 'Gagal mengunggah foto ke Cloudinary' },
      { status: 500 }
    );
  }
}
