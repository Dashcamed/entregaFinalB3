import AdoptionRepository from "../repository/adoption.repository.js";
import userServices from "./user.services.js";
import petServices from "./pet.services.js";

const userService = new userServices();
const petService = new petServices();

const adoptionRepository = new AdoptionRepository();

export default class AdoptionService {
  constructor() {}

  async createAdoption(adoption) {
    try {
      const newAdoption = await adoptionRepository.createAdoption(adoption);
      return newAdoption;
    } catch (error) {
      throw error;
    }
  }

  async getAllAdoptions() {
    try {
      const adoptions = await adoptionRepository.getAllAdoptions();
      return adoptions;
    } catch (error) {
      throw error;
    }
  }

  async getOneAdoption(aid) {
    try {
      const adoption = await adoptionRepository.getOneAdoption(aid);
      return adoption;
    } catch (error) {
      throw error;
    }
  }

  async updateOneAdoption(aid, uid, pid) {
    try {
      const adoption = await adoptionRepository.getOneAdoption(aid);
      const previousPet = await petService.getPetById(adoption.pet);
      previousPet.adopted = false;
      previousPet.owner = null;
      await petService.updateOnePet(adoption.pet, previousPet);
      const user = await userService.getUserById(uid);
      const petIndex = user.pets.findIndex(
        (pet) => pet.toString() === adoption.pet.toString()
      );
      if (petIndex !== -1) {
        user.pets.splice(petIndex, 1);
      }
      await userService.updateOneUser(uid, user);
      const newPet = await petService.getPetById(pid);
      user.pets.push(pid);
      await userService.updateOneUser(uid, user);
      newPet.adopted = true;
      newPet.owner = uid;
      await petService.updateOnePet(pid, newPet);
      const updatedAdoption = await adoptionRepository.updateOneAdoption(aid, {
        owner: uid,
        pet: pid,
      });
      return updatedAdoption;
    } catch (error) {
      throw error;
    }
  }

  async deleteOneAdoption(aid) {
    try {
      const adoption = await adoptionRepository.getOneAdoption(aid);
      const previousPet = await petService.getPetById(adoption.pet);
      previousPet.adopted = false;
      previousPet.owner = null;
      await petService.updateOnePet(adoption.pet, previousPet);
      const user = await userService.getUserById(adoption.owner);
      const petIndex = user.pets.findIndex(
        (pet) =>
          (pet._id?.toString &&
            pet._id.toString() === adoption.pet.toString()) ||
          (pet._id?.$oid && pet._id.$oid === adoption.pet.toString())
      );
      if (petIndex !== -1) {
        user.pets.splice(petIndex, 1);
      }
      await userService.updateOneUser(adoption.owner, user);
      const deletedAdoption = await adoptionRepository.deleteOneAdoption(aid);
      return deletedAdoption;
    } catch (error) {
      throw error;
    }
  }
}
