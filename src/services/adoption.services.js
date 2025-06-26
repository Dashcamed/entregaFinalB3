import AdoptionRepository from "../repository/adoption.repository.js";

const adoptionRepository = new AdoptionRepository();

export default class AdoptionService {
  constructor() {}

  async createAdoption(adoption) {
    const newAdoption = await adoptionRepository.createAdoption(adoption);
    return newAdoption;
  }

  async getAllAdoptions() {
    const adoptions = await adoptionRepository.getAllAdoptions();
    return adoptions;
  }

  async getOneAdoption(aid) {
    const adoption = await adoptionRepository.getOneAdoption(aid);
    return adoption;
  }

  async updateOneAdoption(aid, adoption) {
    const updatedAdoption = await adoptionRepository.updateOneAdoption(
      aid,
      adoption
    );
    return updatedAdoption;
  }

  async deleteOneAdoption(aid) {
    const deletedAdoption = await adoptionRepository.deleteOneAdoption(aid);
    return deletedAdoption;
  }
}
