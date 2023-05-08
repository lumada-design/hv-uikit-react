import express from "express";
import ViteExpress from "vite-express";

import routes from "./routes/component";

// Create a new Express app
const app = express();

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Define routes and middleware functions
app.use("/api", routes);

// Start the express server
ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
