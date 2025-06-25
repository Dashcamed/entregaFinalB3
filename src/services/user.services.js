import UserRepository from "../repository/user.repository.js";
const userRepository = new UserRepository();

export default class UserService {
  constructor() {}

  createUser = async (user) => {
    try {
      if (!user) {
        throw new Error("User is required");
      }
      let result = await userRepository.createUser(user);
      return result;
    } catch (error) {
      throw error;
    }
  };

  createManyUsers = async (users) => {
    try {
      const newUsers = await userRepository.createManyUsers(users);
      return newUsers;
    } catch (error) {
      throw error;
    }
  };

  getAllUsers = async () => {
    try {
      const users = await userRepository.getAllUsers();
      return users;
    } catch (error) {
      throw error;
    }
  };

  getUserById = async (id) => {
    try {
      const user = await userRepository.getUserById(id);
      return user;
    } catch (error) {
      throw error;
    }
  };

  getUserByEmail = async (email) => {
    try {
      const user = await userRepository.getByEmail(email);
      return user;
    } catch (error) {
      throw error;
    }
  };

  updateUser = async (id, user) => {
    try {
      const updatedUser = await userRepository.updateOneUser(id, user);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };

  deleteUser = async (id) => {
    try {
      const deletedUser = await userRepository.deleteOneUser(id);
      return deletedUser;
    } catch (error) {
      throw error;
    }
  };
}
