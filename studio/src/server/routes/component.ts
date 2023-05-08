import express from "express";

import { getComponents } from "../controllers/component";

const router = express.Router();

router.get("/components", getComponents);

export default router;
