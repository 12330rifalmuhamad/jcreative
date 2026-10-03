import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with timeout and credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
  timeout: 120000,
});

export interface CloudinaryUploadResult {
  url: string;
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  created_at: string;
}

export interface CloudinaryResource {
  public_id: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  url: string;
  secure_url: string;
}

/**
 * Upload a Buffer or Data URL to Cloudinary
 */
export async function uploadBufferToCloudinary(
  buffer: Buffer,
  folder: string = 'jcreative',
  mimeType: string = 'image/jpeg'
): Promise<CloudinaryUploadResult> {
  const base64Data = buffer.toString('base64');
  const dataUri = `data:${mimeType};base64,${base64Data}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    resource_type: 'image',
    transformation: [
      { quality: 'auto:good' },
      { fetch_format: 'auto' },
    ],
  });

  return {
    url: result.url,
    secure_url: result.secure_url,
    public_id: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes,
    created_at: result.created_at,
  };
}

/**
 * Delete a resource by public_id
 */
export async function deleteFromCloudinary(publicId: string) {
  return await cloudinary.uploader.destroy(publicId);
}

/**
 * List images from Cloudinary
 */
export async function listCloudinaryImages(
  prefix?: string,
  maxResults: number = 60
): Promise<CloudinaryResource[]> {
  try {
    const options: Record<string, any> = {
      type: 'upload',
      max_results: maxResults,
    };
    if (prefix) {
      options.prefix = prefix;
    }

    const result = await cloudinary.api.resources(options);
    return result.resources || [];
  } catch (error) {
    console.error('Error fetching Cloudinary resources:', error);
    try {
      const fallback = await cloudinary.api.resources({
        type: 'upload',
        max_results: maxResults,
      });
      return fallback.resources || [];
    } catch (fallbackError) {
      console.error('Fallback Cloudinary fetch error:', fallbackError);
      return [];
    }
  }
}

export default cloudinary;
