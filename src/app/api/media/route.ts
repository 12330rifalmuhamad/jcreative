import { NextRequest, NextResponse } from 'next/server';
import { listCloudinaryImages, deleteFromCloudinary } from '@/lib/cloudinary';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const prefix = searchParams.get('prefix') || undefined;
    const maxResults = Number(searchParams.get('limit')) || 60;

    const resources = await listCloudinaryImages(prefix, maxResults);

    return NextResponse.json({
      success: true,
      resources,
      count: resources.length,
    });
  } catch (error: any) {
    console.error('Failed to list Cloudinary media:', error);
    return NextResponse.json(
      { error: error?.message || 'Gagal memuat media dari Cloudinary' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const publicId = body.public_id;

    if (!publicId) {
      return NextResponse.json(
        { error: 'public_id diperlukan untuk menghapus foto' },
        { status: 400 }
      );
    }

    const result = await deleteFromCloudinary(publicId);
    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error: any) {
    console.error('Failed to delete Cloudinary media:', error);
    return NextResponse.json(
      { error: error?.message || 'Gagal menghapus foto dari Cloudinary' },
      { status: 500 }
    );
  }
}
