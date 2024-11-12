import { z } from "zod";

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

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string().optional(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(z.object({})),
});

export const patientSchema = newPatientSchema.extend({
  id: z.string(),
});

export const nonSensitivePatientSchema = patientSchema.omit({ ssn: true, entries: true });

export type NewPatient = z.infer<typeof newPatientSchema>;

export type Patient = z.infer<typeof patientSchema>;

export type NonSensitivePatient = z.infer<typeof nonSensitivePatientSchema>;
