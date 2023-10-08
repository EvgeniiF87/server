const sharp = require('sharp');

export const resize = async (bufferImg, w?: number, h?: number) => {
  const buffer = bufferImg.buffer;
  const imgW = w ? w : 100;
  const imgH = h ? h : 100;
  const resize = await sharp(buffer)
    .resize(imgW, imgH)
    .jpeg({ mozjpeg: true })
    .toBuffer()
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });

  return resize;
};
