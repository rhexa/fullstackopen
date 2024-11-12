import express from 'express';
import patientsService from '../services/patients';
import { newPatientSchema } from '../types';
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

router.get('/:id', (req, res) => {
  const id = req.params.id;
  try {
    const patient = patientsService.getPatientById(id);
    res.send(patient);
  } catch (error) {
    if (error instanceof Error && error.message === 'Patient not found') {
      res.status(404).send({ error: 'Patient not found' });
    }
  }
});

export default router;