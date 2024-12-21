import { v2 as cloudinary } from 'cloudinary';


interface UploadResponse {
  secure_url: string;
  public_id: string;
}

export const getSignature = async () => {
  const response = await fetch('/api/cloudinary-signature', {
    method: 'POST'
  });
  return response.json();
};

export const uploadToCloudinary = async (file: File): Promise<UploadResponse> => {
  try {
    const { timestamp, signature } = await getSignature();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
    formData.append('resource_type', 'auto');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};