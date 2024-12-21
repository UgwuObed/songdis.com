import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

export async function POST() {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    process.env.CLOUDINARY_API_SECRET!
  );

  return NextResponse.json({ timestamp, signature });
}