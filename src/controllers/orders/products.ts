import type { Response, Request } from "express"
import { ProductsSchema, ProductType } from "../../config/validations/products"
import productModel from "../../models/productModel"
import { GenereteID } from "../../utils/genereteID"
import { HTTP_STATUS_CODE } from "../../config/httpsCode"
import type { dataImageType, CustomReqType } from "../../middleware/image/filterImage"
import fs from 'fs'


export const PostProducts = (req:Request, res:Response) => {
    try {
    const {nama, harga, stok, jenis} = req.body
    const newImage = req.newImage
    const newFilePath = newImage?.newPath

        // Validasi untuk setiap nilai request selain image
        const reqBaru:ProductType = {
            nama_produk: nama,
            jenis_produk: jenis,
            harga_produk: Number(harga),
            stok_produk: Number(stok)
        }
        const result = ProductsSchema.safeParse(reqBaru)
        if(result.success) {
            const {nama_produk, harga_produk, jenis_produk, stok_produk} = result.data
            if(jenis_produk.toLowerCase() == 'makanan' || jenis_produk.toLowerCase() == 'minuman') {
                let PrefixID = jenis_produk.toLowerCase() == 'makanan' ? "MA" :  "MI"
                GenereteID(PrefixID)
                .then(idProduk => {
                    
                    new productModel({
                        id_produk: idProduk,
                        nama_produk,
                        harga_produk,
                        jenis_produk,
                        stok_produk,
                        stok_terjual: 0,
                        image_produk: newImage?.newUrlPath
                    })
                    .save()
                    .then((data) => {
                        res.status(HTTP_STATUS_CODE.CREATED).json({
                            message: 'Berhasil menambahkan produk',
                            nama_produk: data.nama_produk
                        })
                    })
                    .catch((err) => {
                        if(newFilePath) {
                            fs.unlinkSync(newImage?.newPath);
                        }else {
                            console.log('file path undefined')
                        }
                        res.status(HTTP_STATUS_CODE.CONFLICT).json({
                            message: 'terjadi kesalahan',
                            error: err
                        })
                    })
                    
                })
                // console.log(ID)
            }else {
                res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({message: 'jenis tersebut tidak ada'})
            }
            // let produkBaru = new productModel({
                
            // })
            
        }
    } catch (error) {
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
            message: "Terjadi Error",
            error: error
        })
    }
   

}

export const GetAllProducts = async (req:Request, res:Response) => {
    const Products = await productModel.find().select('-_id -_v')
    res.status(HTTP_STATUS_CODE.OK).json({
        message: 'Berhasil',
        data: Products
    })
}

