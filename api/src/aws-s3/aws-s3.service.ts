import { Injectable, Logger } from '@nestjs/common';
import { S3Client, PutObjectCommand, PutObjectCommandInput, PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private logger = new Logger(S3Service.name);
  private region: string;
  private s3: S3Client;

  constructor(private configService: ConfigService) {
    this.region = configService.get<string>('AWS_S3_REGION') || 'eu-west-1';
    this.s3 = new S3Client({
      region: this.region,
    });
  }

  async uploadFile(file: Express.Multer.File, name: string): Promise<string> {
    const bucket = this.configService.get<string>('AWS_FILES_BUCKET_NAME');
    const input: PutObjectCommandInput = {
      Body: file.buffer,
      Bucket: bucket,
      Key: name,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    try {
      const response: PutObjectCommandOutput = await this.s3.send(new PutObjectCommand(input));
      if (response.$metadata.httpStatusCode === 200) {
        return `https://${bucket}.s3.${this.region}.amazonaws.com/${name}`;
      }
      throw new Error('Image not saved in s3!');
    } catch (err) {
      this.logger.error('Cannot save file to s3,', err);
      throw err;
    }
  }

  async uploadFiles(files: Express.Multer.File[]): Promise<{ [key: string]: string }> {
    if (!files || files.length === 0) {
      return {};
    }
    const fileUrls: { [key: string]: string } = {};
    for (const file of files) {
      const fileName = `${file.fieldname}-${Date.now()}`;
      const fileUrl = await this.uploadFile(file, fileName);
      fileUrls[file.fieldname] = fileUrl;
    }
    return fileUrls;
  }
}
