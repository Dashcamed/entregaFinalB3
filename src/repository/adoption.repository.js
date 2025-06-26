import AdoptionMongo from "../dao/mongo/adoption.mongo.js";

const adoptionMongo = new AdoptionMongo();

export default class AdoptionRepository {
  constructor() {}

  async createAdoption(adoption) {
    const newAdoption = await adoptionMongo.create(adoption);
    return newAdoption;
  }

  async getAllAdoptions() {
    const adoptions = await adoptionMongo.getAll();
    return adoptions;
  }

  async getOneAdoption(aid) {
    const adoption = await adoptionMongo.getOne(aid);
    return adoption;
  }

  async updateOneAdoption(aid, adoption) {
    const updatedAdoption = await adoptionMongo.updateOne(aid, adoption);
    return updatedAdoption;
  }

  async deleteOneAdoption(aid) {
    const deletedAdoption = await adoptionMongo.deleteOne(aid);
    return deletedAdoption;
  }
}
