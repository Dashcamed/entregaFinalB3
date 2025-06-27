import AdoptionService from "../services/adoption.services.js";

const adoptionService = new AdoptionService();

export const createAdoption = async (req, res) => {
  try {
    const { uid, pid } = req.params;
    const user = await userServices.getUserById(uid);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const pet = await petServices.getPetById(pid);
    if (!pet) {
      return res.status(404).json({ error: "Mascota no encontrada" });
    }
    if (pet.adopted) {
      return res.status(400).json({ error: "Mascota ya adoptada" });
    }
    user.pets.push(pet._id);
    await userServices.updateUser(user._id, { pets: user.pets });
    await petServices.updatePet(pet._id, { adopted: true, owner: user._id });
    await adoptionService.createAdoption({
      owner: user._id,
      pet: pet._id,
    });
    return res.status(201).json("Adopcion exitosa");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllAdoptions = async (req, res) => {
  try {
    const adoptions = await adoptionService.getAllAdoptions();
    return res.status(200).json(adoptions);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOneAdoption = async (req, res) => {
  try {
    const { aid } = req.params;
    const adoption = await adoptionService.getOneAdoption(aid);
    return res.status(200).json(adoption);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateOneAdoption = async (req, res) => {
  try {
    const { aid } = req.params;
    const adoption = await adoptionService.updateOneAdoption(aid, req.body);
    return res.status(200).json(adoption);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteOneAdoption = async (req, res) => {
  try {
    const { aid } = req.params;
    const adoption = await adoptionService.deleteOneAdoption(aid);
    return res.status(200).json(adoption);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
