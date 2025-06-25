import petModel from "./models/pet.model.js";

export default class PetMongo {
  constructor() {}

  async create(pet) {
    try {
      const newPet = await petModel.create(pet);
      return newPet;
    } catch (error) {
      throw error;
    }
  }

  async createMany(pets) {
    try {
      const newPets = await petModel.insertMany(pets);
      return newPets;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const pets = await petModel.find();
      return pets;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const pet = await petModel.findById(id);
      return pet;
    } catch (error) {
      throw error;
    }
  }

  async update(id, pet) {
    try {
      const updatedPet = await petModel.findByIdAndUpdate(id, pet);
      return updatedPet;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const deletedPet = await petModel.findByIdAndDelete(id);
      return deletedPet;
    } catch (error) {
      throw error;
    }
  }
}
