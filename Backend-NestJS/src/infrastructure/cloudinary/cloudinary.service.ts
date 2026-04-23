import { Inject, Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import * as path from 'path';

@Injectable()
export class CloudinaryService {
  constructor(@Inject('CLOUDINARY') private v2: typeof cloudinary) {}

  async uploadImage(
    file: Express.Multer.File,
    folder: string,
    existingPublicId?: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const publicId =
        existingPublicId ||
        `${path.parse(file.originalname).name}-${Date.now()}`;

      const upload = this.v2.uploader.upload_stream(
        {
          folder: folder,
          public_id: publicId,
          overwrite: true,
          invalidate: true,
          transformation: [
            { width: 800, height: 600, crop: 'limit' },
            { quality: 'auto' },
            { fetch_format: 'auto' },
          ],
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result as UploadApiResponse);
        },
      );

      upload.end(file.buffer);
    });
  }

  extractPublicId(url: string): string {
    const parts = url.split('/');
    const lastPart = parts.pop() || '';
    const fileName = lastPart.split('.')[0];

    return fileName;
  }
}
