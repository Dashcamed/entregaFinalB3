import app from "./app.js";
import { initializeMongo } from "./app.js";
import config from "./config/config.js";
import { logger } from "./config/logger.js";

const PORT = config.PORT;

initializeMongo();

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html>
<head>
    <title>Api Adoptme</title>
</head>
<body style="font-family: 'Courier New', Courier, monospace; box-sizing: border-box; margin: 0; padding: 0;">
    <h1 style="text-align: center;">Api Adoptme</h1>
    <section style="text-align: center; margin-top: 20px; display: flex; justify-content: center; align-items: center; flex-direction: column;">
    <p style="margin-bottom: 20px;">Accede a la documentación de la API en <button style="background-color: #4CAF50; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">
    <a href="/api-docs">Documentación</a></button></p>
    </section>
</body>
</html>`);
});

app.listen(PORT, () => {
  logger.info(`Server running on port http://localhost:${PORT}`);
});
