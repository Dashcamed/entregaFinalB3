import Router from "./class/route.js";
import { getAllPets } from "../controllers/pet.controller.js";
import { addImage, createPetWithImage } from "../controllers/pet.controller.js";

export default class PetRouter extends Router {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.get("/all", ["PUBLIC"], getAllPets);

    this.post("/:uid/imagePet", ["USER", "ADMIN"], addImage);
    this.post("/", ["USER", "ADMIN"], createPetWithImage);
  }
}
