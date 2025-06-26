import ExpressRouter from "express";
import { middLogg } from "../../config/logger.js";
import upload from "../../config/multer.js";
import { passportCall } from "../../utils/utils.js";

export default class Router {
  router;

  constructor() {
    this.router = ExpressRouter();
    this.init();
  }

  init() {}

  getRouter() {
    return this.router;
  }

  applyCallbacks(callbacks) {
    return async (req, res, next) => {
      try {
        const params = [req, res, next];
        for (const callback of callbacks) {
          await callback.apply(this, params);
        }
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
    };
  }

  handleRoles = (roles) => {
    return (req, res, next) => {
      if (roles[0] === "PUBLIC") return next();
      if (!req.user) {
        return res.status(401).json({ error: "No autenticado" });
      }
      const userRole = req.user.role;
      if (
        !roles.some((role) => userRole.toUpperCase() === role.toUpperCase())
      ) {
        return res.status(403).json({
          error: "No tienes permisos para acceder a esta ruta",
          requiredRoles: roles,
          userRole: userRole,
        });
      }
      next();
    };
  };

  get(path, roles, ...callbacks) {
    this.router.get(
      path,
      middLogg,
      roles[0] === "PUBLIC" ? [] : passportCall("jwt"),
      this.handleRoles(roles),
      this.applyCallbacks(callbacks)
    );
  }

  post(path, roles, ...callbacks) {
    this.router.post(
      path,
      middLogg,
      roles[0] === "PUBLIC" ? [] : passportCall("jwt"),
      this.handleRoles(roles),
      upload.single("image"),
      this.applyCallbacks(callbacks)
    );
  }

  put(path, roles, ...callbacks) {
    this.router.put(
      path,
      middLogg,
      roles[0] === "PUBLIC" ? [] : passportCall("jwt"),
      this.handleRoles(roles),
      upload.single("image"),
      this.applyCallbacks(callbacks)
    );
  }

  patch(path, roles, ...callbacks) {
    this.router.patch(
      path,
      middLogg,
      roles[0] === "PUBLIC" ? [] : passportCall("jwt"),
      this.handleRoles(roles),
      upload.single("image"),
      this.applyCallbacks(callbacks)
    );
  }

  delete(path, roles, ...callbacks) {
    this.router.delete(
      path,
      middLogg,
      roles[0] === "PUBLIC" ? [] : passportCall("jwt"),
      this.handleRoles(roles),
      this.applyCallbacks(callbacks)
    );
  }
}
