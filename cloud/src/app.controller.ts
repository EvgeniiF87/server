import {
  Controller,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
  HttpCode,
  Res,
} from "@nestjs/common";
import { AppService } from "./app.service";
import {
  FileInterceptor,
  FileFieldsInterceptor,
} from "@nestjs/platform-express";
import { IQuery } from "./type-query";
import { Response } from "express";

@Controller("/upload")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("preview")
  @HttpCode(201)
  @UseInterceptors(FileInterceptor("preview"))
  async savePreview(
    @UploadedFile() preview: Express.Multer.File,
    @Query() query: IQuery,
    @Res() res: Response
  ) {
    if (!preview)
      throw new BadRequestException("Ошибка! Изображение не получено");
    if (query) {
      const { w, h } = query;
      const url = (await this.appService.savePreview(preview, +w, +h)).url;
      return res.json({ url });
    } else {
      const url = (await this.appService.savePreview(preview)).url;
      return res.json({ url });
    }
  }

  @Post("images")
  @HttpCode(201)
  @UseInterceptors(FileFieldsInterceptor([{ name: "images" }]))
  async saveImages(@UploadedFiles() images: Express.Multer.File[]) {
    if (!images)
      throw new BadRequestException("Ошибка! Изображения не получены");

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
