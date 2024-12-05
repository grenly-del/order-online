import {Request, Response} from 'express'
import QRCode  from 'qrcode'
import path from 'path'
import { APPS } from '../../config'
import fs from 'fs'
import qrcodeModels from '../../models/qrcodeModels'
import { HTTP_STATUS_CODE } from '../../config/httpsCode'

export const GenereteQrCode = async (req:Request, res:Response) => {
    const nomorMeja = req.params.meja;
    const fileName = `meja-${nomorMeja}.png`;
    const filePath = path.join('public/qrcodes', fileName);
    
    
    // URL unik untuk pelanggan 
    const url = `http://192.168.8.239:3003/${nomorMeja}`;

    // Periksa apakah direktori ada, jika tidak ada maka buat direktori
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    }



    try {
      
      // Kirim URL gambar QR Code ke klien
      const qrCodeUrl = `http://localhost:${APPS.PORT}/qrcodes/${fileName}`;
      const newQrCOde = new qrcodeModels({
        nomor_meja: nomorMeja,
        url_qrcode: qrCodeUrl
      }).save()
      .then(async (data) => {
        
        // Buat QR Code sebagai file gambar
        await QRCode.toFile(filePath, url);
        res.status(200).json({ qrCodeUrl, mejaTerdaftar: data });
        })
        .catch(err => res.status(HTTP_STATUS_CODE.CONFLICT).json({message: 'error', error: err}))
      } catch (error) {
        console.error('Error generating QR Code:', error);
        res.status(500).json({ error: 'Failed to generate QR Code' });
      }
}



export const getAllQRCode = (req:Request, res:Response) => {
    
}