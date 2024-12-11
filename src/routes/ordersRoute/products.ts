import { Router } from "express";
import { GetAllProducts, PostProducts } from "../../controllers/orders/products";
import { upload } from "../../middleware/image/uploadImage";
import { filterImg } from "../../middleware/image/filterImage";
import { CheckTokenValid } from "../../middleware/auth/checkToken";

const route = Router()


route.route('/')
    .get(GetAllProducts)
    
    // Harus memiliki hak akses 
    .post(CheckTokenValid, upload.array("image", 10), filterImg ,PostProducts)

export default route