import express from "express";
import recordRouter from "./record.routes";

const router = express.Router();

router.use("/records", recordRouter);

export default router;
