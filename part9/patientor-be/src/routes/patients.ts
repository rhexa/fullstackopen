import express from 'express';
import patientsService from '../services/patients';
import { NewEntry, NewHealthCheckEntrySchema, NewHospitalEntrySchema, NewOccupationalHealthcareEntrySchema, newPatientSchema, parseEntryTypeFromRequestBody } from '../types';
import { z } from 'zod';
import { assertNever } from '../utils';

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

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  const entryType = parseEntryTypeFromRequestBody(req.body);
  let entry: NewEntry | null = null;

  try {
    switch (entryType) {
      case 'Hospital':
        entry = NewHospitalEntrySchema.parse(req.body);
        break;
      case 'OccupationalHealthcare':
        entry = NewOccupationalHealthcareEntrySchema.parse(req.body);
        break;
      case 'HealthCheck':
        entry = NewHealthCheckEntrySchema.parse(req.body);
        break;
      default: 
        assertNever(entryType);
    }

    if (entry === null) throw new Error('Unknown entry type');
    res.send(patientsService.addEntryToPatient(id, entry));
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === 'Patient not found') {
        console.log('routes: Patient not found');
        res.status(404).send({ error: 'Patient not found' });
      }

      if (error instanceof z.ZodError) {
        console.log('routes: ZodError');
        res.status(400).send({ error: error.issues });
      }
    }
  }
});

export default router;