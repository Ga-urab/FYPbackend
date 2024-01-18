import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';

const storage = diskStorage({
  destination: './uploads', // Adjust this path to your desired upload directory
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

@Controller()
export class UploaderController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage }))
  uploadFile(@UploadedFile() file: Express.Multer.File): string {
    // Handle the uploaded file (stored on disk in this example)
    console.log(file);

    // You can save the file path to a database or perform other actions

    return 'File uploaded successfully';
  }
}
