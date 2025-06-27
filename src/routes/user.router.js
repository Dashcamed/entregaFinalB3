import {
  getAllUsers,
  getUserById,
  updateOneUser,
  deleteUser,
  addDocument,
} from "../controllers/user.controller.js";
import upload from "../config/multer.js";
import Router from "./class/route.js";

export default class UserRouter extends Router {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.get("/all", ["USER", "ADMIN"], getAllUsers);
    this.get("/:uid", ["USER", "ADMIN"], getUserById);
    this.put("/:uid", ["USER", "ADMIN"], updateOneUser);
    this.delete("/:uid", ["USER", "ADMIN"], deleteUser);
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
