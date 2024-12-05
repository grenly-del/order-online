import {Request, Response, NextFunction} from 'express'

// ================= MEMFILTER IMAGE DAN MENGUBAH DIRECTORI IMAGE YANG BARU ===============
export const filterImg = async (req:Request, res:Response, next:NextFunction) => {
    const files = req.files;
    let newImage;
    const baseurl = req.baseUrl;
    const arr = baseurl.split('/');
    const namePath = arr[3];
    console.log(namePath)
    let dataImage = {
      namePath: namePath,
      img: [],
      newPath: ''
    };
  
    await Promise.all(
      files.map((file) => {
        const dest = file.destination;
        const imagePath = path.join(dest, file.filename);
        const buffImg = fs.readFileSync(imagePath);
        const newPath = `${dest}/${namePath}/${file.filename}`;
  
        const image = sharp(buffImg);
        return image
          .withMetadata()
          .toBuffer()
          .then((buffer) => {
            fs.writeFileSync(newPath, buffer);
            newImage = newPath;
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