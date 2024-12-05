import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import { HTTP_STATUS_CODE } from '../../config/httpsCode';

export interface dataImageType {
  namePath: string;
  img: Express.Multer.File[];
  newPath: string;
  newUrlPath: string
}

export interface CustomReqType extends Request {
  newImage?: dataImageType | undefined;
  files?: Express.Multer.File[];
}

// ================= MEMFILTER IMAGE DAN MENGUBAH DIRECTORI IMAGE YANG BARU ===============
export const filterImg = async (req: CustomReqType, res: Response, next: NextFunction) => {
  const files = req.files as Express.Multer.File[];
  const namePath = req.body.jenis?.toLowerCase();

  if (!files || files.length === 0) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: 'No files uploaded' });
  }

  if (!namePath) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: 'Jenis field is required' });
  }

  let dataImage: dataImageType = {
    namePath: namePath,
    img: [],
    newPath: '',
    newUrlPath: ''
  };

  try {
    await Promise.all(
      files.map(async (file) => {
        const dest = file.destination;
        let newArr = dest.split('/')
        const imagePath = path.join(dest, file.filename);
        const buffImg = fs.readFileSync(imagePath);
        const newPath = `${dest}/${namePath}/${file.filename}`;
        // console.log(imagePath)
        const NewUrlForImg = `${newArr[1]}/${namePath}/${file.filename}`

        // buat folder baru jika tidak ada
        if (!fs.existsSync(`${dest}/${namePath}`)) {
          fs.mkdirSync(`${dest}/${namePath}`, { recursive: true });
        }

        // membuat path baru dan menghapus path lama image
        await sharp(buffImg)
          .withMetadata()
          .toBuffer()
          .then((buffer: Buffer) => {
            fs.writeFileSync(newPath, buffer);
            dataImage.img.push(file);
            dataImage.newPath = newPath;
            dataImage.newUrlPath = NewUrlForImg
          });

        // Delete the old image
        fs.unlinkSync(imagePath);
      })
    );

    // Assign processed data to the request object
    req.newImage = dataImage;
    next();
  } catch (err) {
    console.error('Error in image processing:', err);
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: 'Image processing failed' });
  }
};
