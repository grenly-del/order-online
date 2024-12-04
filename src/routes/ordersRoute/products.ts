import { Router } from "express";
import { GetAllProducts, PostProducts } from "../../controllers/orders/products";

const route = Router()


route.route('/')
    .get(GetAllProducts)
    .post(PostProducts)

export default route