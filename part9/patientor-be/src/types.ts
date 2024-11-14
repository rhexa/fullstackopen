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

export type EntryType = 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck';

export const parseEntryTypeFromRequestBody = (body: unknown): EntryType => { 
  if (!body || typeof body !== 'object') throw new Error('Incorrect or missing type');
  if (!('type' in body)) throw new Error('Incorrect or missing type');
  
  const { type } = body;

  if (typeof type === 'string' && (type === 'Hospital' || type === 'OccupationalHealthcare' || type === 'HealthCheck')) return type as EntryType;
  throw new Error('Incorrect or missing type');
};

// ## Entry
// Schemas
const BaseEntrySchema = z.object({
  id: z.string().min(1),
  date: z.coerce.date(),
  specialist: z.string().min(3),
  description: z.string().min(3),
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal('Hospital'),
  diagnosisCodes: z.array(z.string()).optional(),
  discharge: z.object({
    date: z.string().min(1),
    criteria: z.string().min(1),
  }),
});

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  diagnosisCodes: z.array(z.string()).optional(),
  employerName: z.string(),
  sickLeave: z.optional(z.object({
    startDate: z.string().min(1),
    endDate: z.string().min(1),
  })),
});

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.number(),
});

export const EntrySchema = z.union([
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
  HealthCheckEntrySchema,
]);

export const NewHospitalEntrySchema = HospitalEntrySchema.omit({ id: true });
export const NewOccupationalHealthcareEntrySchema = OccupationalHealthcareEntrySchema.omit({ id: true });
export const NewHealthCheckEntrySchema = HealthCheckEntrySchema.omit({ id: true });

export const NewEntrySchema = z.union([
  NewHospitalEntrySchema,
  NewOccupationalHealthcareEntrySchema,
  NewHealthCheckEntrySchema
]);

// Type definitions
export type Entry = z.infer<typeof EntrySchema>;
export type HospitalEntry = z.infer<typeof HospitalEntrySchema>;
export type OccupationalHealthcareEntry = z.infer<typeof OccupationalHealthcareEntrySchema>;
export type HealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>;

export type NewEntry = z.infer<typeof NewEntrySchema>;
export type NewHospitalEntry = z.infer<typeof NewHospitalEntrySchema>;
export type NewOccupationalHealthcareEntry = z.infer<typeof NewOccupationalHealthcareEntrySchema>;
export type NewHealthCheckEntry = z.infer<typeof NewHealthCheckEntrySchema>;

// ## Patient
// Schemas
export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().pipe(z.coerce.date()),
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
