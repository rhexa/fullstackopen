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

// ## Entry
// Schemas
export const HospitalEntrySchema = z.object({
  id: z.string(),
  date: z.string(),
  type: z.literal('Hospital'),
  specialist: z.string(),
  description: z.string(),
  diagnosisCodes: z.array(z.string()),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

export const OccupationalHealthcareEntrySchema = z.object({
  id: z.string(),
  date: z.string(),
  type: z.literal('OccupationalHealthcare'),
  specialist: z.string(),
  description: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  employerName: z.string(),
  sickLeave: z.optional(z.object({
    startDate: z.string(),
    endDate: z.string(),
  })),
});

export const HealthCheckEntrySchema = z.object({
  id: z.string(),
  date: z.string(),
  type: z.literal('HealthCheck'),
  specialist: z.string(),
  description: z.string(),
  healthCheckRating: z.number(),
});

export const EntrySchema = z.union([
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
  HealthCheckEntrySchema,
]);

// Type definitions
export type Entry = z.infer<typeof EntrySchema>;
export type HospitalEntry = z.infer<typeof HospitalEntrySchema>;
export type OccupationalHealthcareEntry = z.infer<typeof OccupationalHealthcareEntrySchema>;
export type HealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>;

// ## Patient
// Schemas
export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string().optional(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(EntrySchema),
});

export const patientSchema = newPatientSchema.extend({
  id: z.string(),
});

export const nonSensitivePatientSchema = patientSchema.omit({ ssn: true, entries: true });

// Type definitions
export type NewPatient = z.infer<typeof newPatientSchema>;
export type Patient = z.infer<typeof patientSchema>;
export type NonSensitivePatient = z.infer<typeof nonSensitivePatientSchema>;
