import { Router } from "express";
import { GetAllProducts, PostProducts } from "../../controllers/orders/products";
import { upload } from "../../middleware/image/uploadImage";
import { filterImg } from "../../middleware/image/filterImage";

const route = Router()


route.route('/')
    .get(GetAllProducts)
    .post(upload.array("images", 10), filterImg ,PostProducts)

export default route