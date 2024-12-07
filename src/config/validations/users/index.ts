import {z} from 'zod'


export const userSchema = z.object({
    nama_pengguna: z.string(),
    role: z.string(),
    email: z.string().email("format email tidak valid!"),
    password: z.string().min(7, 'password harus lebih dari 8'),
    status: z.boolean().optional()
})

export type userType = z.infer<typeof userSchema>