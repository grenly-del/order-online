import {Response, Request} from 'express'

export const PostOrder = (req: Request, res: Response) => {
    res.json({
        message: 'berhasil'
    })
}