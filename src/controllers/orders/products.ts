import type { Response, Request } from "express"
import { ProductsSchema, ProductType } from "../../config/validations/products"
import productModel from "../../models/productModel"
import { GenereteID } from "../../utils/genereteID"
import { HTTP_STATUS_CODE } from "../../config/httpsCode"

export const PostProducts = (req:Request, res:Response) => {
    const {nama, harga, stok, jenis} = req.body
    const reqBaru:ProductType = {
        nama_produk: nama,
        jenis_produk: jenis,
        harga_produk: Number(harga),
        stok_produk: Number(stok)
    }
    const result = ProductsSchema.safeParse(reqBaru)
    if(result.success) {
        const {nama_produk, harga_produk, jenis_produk, stok_produk} = result.data
        if(jenis_produk.toLowerCase() == 'makanan') {
            GenereteID("MA")
            .then(idProduk => {
                
                new productModel({
                    id_produk: idProduk,
                    nama_produk,
                    harga_produk,
                    jenis_produk,
                    stok_produk,
                    stok_terjual: 0
                })
                .save()
                .then((data) => {
                    res.status(HTTP_STATUS_CODE.CREATED).json({
                        message: 'Berhasil menambahkan produk',
                        nama_produk: data.nama_produk
                    })
                })
                .catch((err) => {
                    res.status(HTTP_STATUS_CODE.CONFLICT).json({
                        message: 'terjadi kesalahan',
                        error: err
                    })
                })
                
            })
            // console.log(ID)
        }else if(jenis_produk.toLowerCase() == 'minuman') {
            GenereteID("MI")
            .then(idProduk => {
                
                    const newProduk = new productModel({
                        id_produk: idProduk,
                        nama_produk,
                        harga_produk,
                        jenis_produk,
                        stok_produk,
                        stok_terjual: 0
                    })
                    newProduk.save()
                    .then(data => {
                        res.status(HTTP_STATUS_CODE.CREATED).json({
                            message: 'Berhasil menambahkan produk',
                            nama_produk: data.nama_produk
                        })
                    })
                    .catch(err => {
                        res.status(HTTP_STATUS_CODE.CONFLICT).json({
                            message: 'terjadi kesalahan',
                            error: err
                        })
                    })
                
            })
        }else {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({message: 'jenis tersebut tidak ada'})
        }
         // let produkBaru = new productModel({
            
        // })
        
    }
   

}

export const GetAllProducts = (req:Request, res:Response) => {
    res.send('test')
}

