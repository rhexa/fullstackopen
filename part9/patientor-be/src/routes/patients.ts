import express from 'express';
import patientsService from '../services/patients';
import { newPatientSchema } from '../utils';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = newPatientSchema.parse(req.body);
    res.send(patientsService.addPatient(newPatient));
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'Unknown error' });
    }
  }
});

export default router;