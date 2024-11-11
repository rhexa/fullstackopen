import { z } from "zod";
import { newPatientSchema } from "./utils";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export type NewPatient = z.infer<typeof newPatientSchema>;

export interface Patient extends NewPatient {
  id: string;
}

export type nonSensitivePatientData = Omit<Patient, 'ssn'>;
