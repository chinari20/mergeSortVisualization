import { generateMergeSortSteps } from "../models/mergeSort.model.js";

export const mergeSortHandler = (req, res) => {
  const { array } = req.body;

  if (!Array.isArray(array)) {
    return res.status(400).json({ message: "Invalid array input" });
  }

  const steps = generateMergeSortSteps([...array]);
  res.status(200).json({ steps });
};
