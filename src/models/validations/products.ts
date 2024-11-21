import {z} from 'zod'

const productsSchema = z.object({
    nama_produk: z.string(),
    id_produk: z.string().max(5, "id products tidak valid max 5 digit"),
    harga_produk: z.number(),
    stok_produk: z.number(),
    jenis_produk: z.string()
})


export type ProductsType = z.infer<typeof productsSchema>