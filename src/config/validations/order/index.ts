import {z} from 'zod'

const OrderSchema = z.object({
    nama_pelanggan: z.string(),
    list_pesanan: z.array(z.object({
        nama_pesanan: z.string(),
        harga_pesanan: z.number(),
        jumlah_pesanan: z.number(),
        jenis_pesanan: z.string()
    })),
    total_harga: z.number()
})


export type ListPesananType = {
    nama_pesanan: string,
    harga_pesanan: number,
    jumlah_pesanan: number,
    jenis_pesanan: string
}
export type OrderType = z.infer<typeof OrderSchema>