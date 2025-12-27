import express from "express";
import { mergeSortHandler } from "../controllers/mergeSort.controller.js";

const router = express.Router();

router.post("/merge-sort", mergeSortHandler);

export default router;
