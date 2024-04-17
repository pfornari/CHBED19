import { Router } from "express";
import { switchUser } from "../../Controllers/API/user.controller.js";
// import { passportCall, authorization } from "../../utils/authorizations.js";
import { passportCall, authorization, authToken } from "../../dirname.js";
import {
  resetPasswordEmail,
  resetPassword,
  restorePassword,
} from "../../dirname.js";
// import { resetPasswordEmail, resetPassword, restorePassword } from "../../utils/nodemailer.js";
import { getUser, uploadFiles } from "../../Controllers/API/user.controller.js";
import { restoreForm } from "../../Controllers/VIEWS/user.views.controller.js";
import { uploader } from "../../dirname.js";

const router = Router();

router.get("/:id", getUser);

//ruta para cambiar de rol de user a premium
router.get(
  "/premium/:uid",
  passportCall("jwt"),
  authorization(["premium", "user"]),
  switchUser
);


router.post("/sendEmailToReset", resetPasswordEmail);

router.get("/resetPassword/:token", resetPassword);

router.get(`/restoreForm/:token`, restoreForm);

router.post(`/restoreForm`, restorePassword);

router.post(
  `/:uid/:destination`,
  passportCall("jwt"),
  authorization(["premium", "user"]),
  //lo que esté dentro de array tiene que tener el mismo nombre que voy a subir desde postman
  uploader.any("file"),
  uploadFiles
);

export default router;
