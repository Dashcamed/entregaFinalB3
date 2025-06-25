import { getAllUsers, addDocument } from "../controllers/user.controller.js";
import upload from "../config/multer.js";
import Router from "./class/route.js";

export default class UserRouter extends Router {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.get("/all", ["ADMIN"], getAllUsers);

    this.post(
      "/:uid/documents",
      ["USER", "ADMIN"],
      upload.single("document"),
      addDocument
    );

    this.get("/current", ["USER", "ADMIN"], (req, res) => {
      res.send({ status: "success", payload: req.user });
    });
  }
}
