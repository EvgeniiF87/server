import { Injectable } from "@nestjs/common";
import { ensureDir, writeFile } from "fs-extra";
import { path } from "app-root-path";
import { v4 as uuidV4 } from "uuid";
import { resize } from "./lib/resize";

@Injectable()
export class AppService {
  async saveImage(image: Express.Multer.File) {
    const folder = `${path}/uploads`;
    const imgName = uuidV4();
    await ensureDir(folder);
    await writeFile(`${folder}/${imgName}.jpg`, image.buffer);

    return { url: `/uploads/${imgName}.jpg` };
  }

  async savePreview(image: Express.Multer.File, w?: number, h?: number) {
    const folder = `${path}/uploads`;
    const imgName = uuidV4();
    await ensureDir(folder);
    const resizeImg = await resize(image, w, h);
    await writeFile(`${folder}/${imgName}.jpg`, resizeImg);

    return { url: `/uploads/${imgName}.jpg` };
  }
}
