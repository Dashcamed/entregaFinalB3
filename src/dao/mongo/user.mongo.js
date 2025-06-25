import userModel from "./models/user.model.js";

export default class UserMongo {
  constructor() {}

  async create(user) {
    try {
      const newUser = await userModel.create(user);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async createMany(users) {
    try {
      const newUsers = await userModel.insertMany(users);
      return newUsers;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  getByEmail = async (email) => {
    try {
      const user = await userModel.findOne({ email }).select("+password");
      return user;
    } catch (error) {
      throw error;
    }
  };

  async getById(id) {
    try {
      const user = await userModel.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id, user) {
    try {
      const updatedUser = await userModel.findByIdAndUpdate(id, user);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const deletedUser = await userModel.findByIdAndDelete(id);
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }
}
