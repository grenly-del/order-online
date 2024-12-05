import { Router } from "express";
import { GetAllProducts, PostProducts } from "../../controllers/orders/products";
import { upload } from "../../middleware/image/uploadImage";

const route = Router()


route.route('/')
    .get(GetAllProducts)
    .post(upload.array("images", 10) ,PostProducts)

export default route