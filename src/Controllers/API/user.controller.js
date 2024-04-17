// import userRepository from "../../Services/Repository/user.repository.js";
import { generateJWToken } from "../../dirname.js";
import { logUser } from "./jwt.controller.js";
import { userService } from "../../Services/services.js";

export const switchUser = async (req, res) => {
  const { uid } = req.params;
  req.logger.info(uid);
  const currentRole = req.user.role;
  const userStatus = req.user.status;

  //para cambiar de user a premium
  if (currentRole === "user") {
    if (userStatus === "docsUploaded") {
      req.user.role = "premium";
    } else
      return res
        .status(400)
        .send("Error. Primero debe subir los documentos correspondientes");
    //para cambiar de premium a user
  } else {
    req.user.role = "user";
  }

  const newRole = req.user.role;
  req.logger.info(newRole);
  const user = req.user;

  await userService.updateUserRole(uid, newRole);
  const access_token = generateJWToken(user);
  res.cookie("jwtCookieToken", access_token, {
    maxAge: 600000,
    httpOnly: true,
  });
  res.status(200).send(newRole);
};

export const getUser = async (req, res) => {
  const { uid } = req.params;
  const user = await userService.getUser(uid);
  res.status(200).send(user);
};

export const uploadFiles = async (req, res) => {
  const { uid } = req.params;
  const { destination } = req.params;
  const uploadedFiles = req.files;
  const user = req.user;

  if (!req.files) {
    return res
      .status(400)
      .send({ status: "error", mensaje: "No se adjunto archivo." });
  }
  // console.log(req.file);

  if (destination === "profile") {
    uploadedFiles.forEach((file) => {
      const imgPath = file.path;
      const imgName = file.originalname;

      userService.updateUserFiles(uid, imgName, imgPath);
    });
    req.logger.info("Imagen subida a profile");
  } else if (destination === "products") {
    uploadedFiles.forEach((file) => {
      const imgPath = file.path;
      const imgName = file.originalname;

      userService.updateUserFiles(uid, imgName, imgPath);
    });
    req.logger.info("Imágenes subida a products");
  } else if (destination === "documents" && uploadedFiles.length === 3) {
    uploadedFiles.forEach((file) => {
      const imgPath = file.path;
      const imgName = file.originalname;

      userService.updateUserFiles(uid, imgName, imgPath);
    });
    //si subió las 3 imágenes que piden en documents, entonces actualiza su estado para que se le habilite a cambiar el rol

    userService.updateUserStatus(uid);

    req.logger.info("Imágenes subida a documents");
  } else {
    req.logger.info("Destino desconocido");
  }

  //tengo que volver a guardar la cookie con el status modificado para que me acepte cambiar a premium
  const access_token = generateJWToken(user);
  res.cookie("jwtCookieToken", access_token, {
    maxAge: 600000,
    httpOnly: true,
  });
  res.send({
    status: "success",
    message: "imagenes subidas con éxito"
  });
};
