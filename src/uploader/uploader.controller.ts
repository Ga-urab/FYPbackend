// import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express/multer';
// import { diskStorage } from 'multer';

// const storage = diskStorage({
//   destination: './uploads', // Adjust this path to your desired upload directory
//   filename: (req, file, cb) => {
//     const filename = `${Date.now()}-${file.originalname}`;
//     cb(null, filename);
//   },
// });

// @Controller()
// export class UploaderController {
//   @Post('upload')
//   @UseInterceptors(FileInterceptor('file', { storage }))
//   uploadFile(@UploadedFile() file: Express.Multer.File): string {
//     console.log(file);
//     return 'File uploaded successfully';
//   }
// }
import { Controller, Post, UploadedFile , UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UploadedFileDocument, UploadedFiles } from './uploader.model';

const storage = diskStorage({
  destination: './uploads', // Adjust this path to your desired upload directory
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

@Controller()
export class UploaderController {
  constructor(@InjectModel(UploadedFiles.name) private readonly uploadedFileModel: Model<UploadedFileDocument>) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage }))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    const { originalname, filename, path } = file;
    const createdFile = new this.uploadedFileModel({ originalname, filename, path });
    await createdFile.save();
    return 'File uploaded successfully';
  }
}
