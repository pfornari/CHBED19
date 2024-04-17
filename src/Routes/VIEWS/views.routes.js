import { Router } from "express";
import {
  getChat,
  home,
  resetView,
  testFrontEnd,
} from "../../Controllers/VIEWS/general.views.controller.js";
// import { passportCall, authorization } from "../../utils/authorizations.js";
import { passportCall, authorization, authToken } from "../../dirname.js";
import { getOneProduct, getProducts } from "../../Controllers/API/products.controller.js";
import cors from "cors";
import config from "../../config/config.js";


const router = Router();
router.use(
  cors({
    credentials: true,
    origin: config.rootUrl,
  })
);

router.get("/", home);

router.get("/chat", passportCall("jwt"), authorization("user"), getChat);

router.get("/products", getProducts);

router.get("/products/:id", getOneProduct);

router.get("/resetPassword", resetView)

router.get("/test", passportCall("jwt"), testFrontEnd)

export default router;
