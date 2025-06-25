import ExpressRouter from "express";
import { middLogg } from "../../config/logger.js";
import upload from "../../config/multer.js";
import config from "../../config/config.js";
import jwt from "jsonwebtoken";

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

  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      middLogg,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }

  put(path, policies, ...callbacks) {
    this.router.put(
      path,
      middLogg,
      this.handlePolicies(policies),
      upload.single("image"),
      this.applyCallbacks(callbacks)
    );
  }

  patch(path, policies, ...callbacks) {
    this.router.patch(
      path,
      middLogg,
      this.handlePolicies(policies),
      upload.single("image"),
      this.applyCallbacks(callbacks)
    );
  }

  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      middLogg,
      this.handlePolicies(policies),
      upload.single("image"),
      this.applyCallbacks(callbacks)
    );
  }

  delete(path, policies, ...callbacks) {
    this.router.delete(
      path,
      middLogg,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }

  handlePolicies = (policies) => {
    return async (req, res, next) => {
      try {
        if (policies[0] === "PUBLIC") {
          next();
          return;
        }
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          res.status(401).json({
            status: "error",
            message: "No token provided",
          });
          return;
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
          res.status(401).json({
            status: "error",
            message: "Invalid token format",
          });
          return;
        }
        let user;
        try {
          user = jwt.verify(token, config.JWT_PRIVATE_KEY);
        } catch (error) {
          res.status(401).json({
            status: "error",
            message: "Invalid or expired token",
          });
          return;
        }
        const userRole = user?.role;

        if (
          !userRole ||
          !policies.some(
            (policy) => userRole.toUpperCase() === policy.toUpperCase()
          )
        ) {
          console.log("Access denied - User role not in required policies");
          res.status(403).json({
            error: "No tienes permisos para acceder a esta ruta",
            requiredRoles: policies,
            userRole: userRole,
          });
          return;
        }
        req.user = user;
        next();
      } catch (error) {
        next(error);
      }
    };
  };
}
