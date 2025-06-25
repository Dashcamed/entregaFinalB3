import UserServices from "../services/user.services.js";
const userServices = new UserServices();

export const getAllUsers = async (req, res) => {
  try {
    const users = await userServices.getAllUsers();
    res.status(200).send({ status: "success", payload: users });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ status: "error", error: "Error al obtener usuarios" });
  }
};

export const addDocument = async (req, res) => {
  try {
    const { uid } = req.params;
    const { name, type = "document" } = req.body;

    if (!name) {
      return res.status(400).json({
        status: "error",
        error: "El nombre del documento es requerido",
      });
    }

    const user = await userServices.getUserById(uid);
    if (!user) {
      return res.status(404).json({
        status: "error",
        error: "Usuario no encontrado",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        status: "error",
        error: "No se ha subido ningún archivo",
      });
    }

    user.document.push({
      name: name,
      reference: req.file.path,
      type: type,
    });

    await user.save();

    res.status(200).json({
      status: "success",
      message: "Archivo subido correctamente",
      document: {
        name: name,
        reference: req.file.path,
        type: type,
      },
    });
  } catch (error) {
    console.error("Error en addDocument:", error);
    res.status(500).json({
      status: "error",
      error: "Error al procesar el archivo",
      details: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
