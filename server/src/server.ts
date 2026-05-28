import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env, validateEnv } from "./config/env.js";

const startServer = async () => {
  validateEnv();
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
