import Router from "./class/route.js";
import {
  getAllPets,
  getPetById,
  addImage,
  createPetWithImage,
  createPet,
  updateOnePet,
  deleteOnePet,
} from "../controllers/pet.controller.js";

export default class PetRouter extends Router {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.get("/all", ["PUBLIC"], getAllPets);
    this.get("/:uid", ["USER", "ADMIN"], getPetById);
    this.post("/:uid/imagePet", ["USER", "ADMIN"], addImage);
    this.post("/", ["USER", "ADMIN"], createPetWithImage);
    this.post("/", ["USER", "ADMIN"], createPet);
    this.put("/:uid", ["USER", "ADMIN"], updateOnePet);
    this.delete("/:uid", ["USER", "ADMIN"], deleteOnePet);
  }
}
