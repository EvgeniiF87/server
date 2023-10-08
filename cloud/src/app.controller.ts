import {
  Controller,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { AppService } from "./app.service";
import {
  FileInterceptor,
  FileFieldsInterceptor,
} from "@nestjs/platform-express";
import { IQuery } from "./type-query";

@Controller("/upload")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("preview")
  @UseInterceptors(FileInterceptor("preview"))
  async savePreview(
    @UploadedFile() preview: Express.Multer.File,
    @Query() query: IQuery
  ) {
    if (query) {
      const { w, h } = query;
      return (await this.appService.savePreview(preview, +w, +h)).url;
    } else {
      return (await this.appService.savePreview(preview)).url;
    }
  }

  @Post("images")
  @UseInterceptors(FileFieldsInterceptor([{ name: "images" }]))
  async saveImages(@UploadedFiles() images: Express.Multer.File[]) {
    const filesArr = Object.values(images).map((image) => image)[0];
    const imagesArr = [];

    for (const key in filesArr) {
      await this.appService
        .saveImage(filesArr[key])
        .then((data) => data)
        .then((data) => imagesArr.push(data.url));
    }
    return imagesArr;
  }
}
