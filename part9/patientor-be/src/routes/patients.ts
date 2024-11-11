import express from 'express';
import patientsService from '../services/patients';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    res.send(patientsService.addPatient(newPatient));
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});
export default router;