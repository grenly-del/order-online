import {Request, Response, NextFunction} from 'express'
import fs from 'fs'
import sharp from 'sharp';
import path from 'path';

interface dataImageType {
  namePath: String,
  img: any,
  newPath: String
}
interface CustomReq extends Request {
  newImage?: dataImageType 
  files?: Express.Multer.File[];
}
// ================= MEMFILTER IMAGE DAN MENGUBAH DIRECTORI IMAGE YANG BARU ===============
export const filterImg = async (req:CustomReq, res:Response, next:NextFunction) => {
    const files = req.files as Express.Multer.File[];
    let newImage
    const namePath = req.body.jenis.toLowerCase()
    console.log(namePath)
    let dataImage = {
      namePath: namePath,
      img: [],
      newPath: ''
    };
  
    await Promise.all(
      files?.map((file:any) => {
        const dest = file.destination;
        const imagePath = path.join(dest, file.filename);
        const buffImg = fs.readFileSync(imagePath);
        const newPath = `${dest}/${namePath}/${file.filename}`;
        console.log(buffImg)

        sharp(buffImg)
          .withMetadata()
          .toBuffer()
          .then((buffer:Buffer) => {
            console.log(`new ${newPath}`)
            fs.writeFileSync(newPath, buffer);
            newImage = newPath;
            console.log(`file`)
            console.log(file)
            dataImage.img.push(file);
            dataImage.newPath = newPath
  
            // ====== HAPUS IMAGE YANG LAMA =======
            fs.unlink(imagePath, (err) => {
                if(err) throw new Error('Gagal Menghapus Image')
                console.log('image terhapus')
            })
  
          })
          .catch((err) => {
            console.log(err);
            throw new Error('Resize gagal');
          });
      })
    );
  
    req.newImage = dataImage;
    next();
  };