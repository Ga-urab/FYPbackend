import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UploadedFileDocument, UploadedFiles } from './uploader.model';

@Controller('files')
export class FilesController {
  constructor(@InjectModel(UploadedFiles.name) private readonly uploadedFileModel: Model<UploadedFileDocument>) {}

  @Get(':filename')
  async serveFile(@Param('filename') filename: string, @Res() res: Response): Promise<void> {
    // Find the file in the database by filename
    const file = await this.uploadedFileModel.findOne({ filename }).exec();

    if (!file) {
      res.status(404).send('File not found');
      return;
    }

    // Send the file as a response
    res.sendFile(filename, { root: path.resolve('./uploads') });
  }
}

