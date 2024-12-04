import {z} from 'zod'
import { ProductsType } from '../../../models/validations/products'

export const ProductsSchema = z.object({
    nama_produk: z.string(),
    jenis_produk: z.string(),
    harga_produk: z.number(),
    stok_produk: z.number(),
    produk_terjual: z.number().optional()
})

export type ProductType = z.infer<typeof ProductsSchema>


