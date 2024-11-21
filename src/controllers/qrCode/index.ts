import {Request, Response} from 'express'
import QRCode  from 'qrcode'
import path from 'path'
import { APPS } from '../../config'
import fs from 'fs'

export const GenereteQrCode = async (req:Request, res:Response) => {
    const nomorMeja = req.params.meja;
    const fileName = `meja-${nomorMeja}.png`;
    const filePath = path.join('public/qrcodes', fileName);
    
    
    // URL unik untuk meja
    const url = `https://example.com/order?meja=${nomorMeja}`;

    // Periksa apakah direktori ada, jika tidak ada maka buat direktori
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    }



    try {
        // Buat QR Code sebagai file gambar
        await QRCode.toFile(filePath, url);
    
        // Kirim URL gambar QR Code ke klien
        const qrCodeUrl = `http://localhost:${APPS.PORT}/qrcodes/${fileName}`;
        res.status(200).json({ qrCodeUrl });
      } catch (error) {
        console.error('Error generating QR Code:', error);
        res.status(500).json({ error: 'Failed to generate QR Code' });
      }
}