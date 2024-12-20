export interface Message {
  value: string,
  type: "success" | "error"
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum EntryType {
  Hospital = "Hospital",
  OccupationalHealthcare = "Occupational Healthcare",
  HealthCheck = "Health Check",
}

export interface HospitalEntry {
  id: string;
  date: string;
  type: 'Hospital';
  specialist: string;
  description: string;
  diagnosisCodes: string[];
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry {
  id: string;
  date: string;
  type: 'OccupationalHealthcare';
  specialist: string;
  description: string;
  diagnosisCodes: string[];
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HealthCheckEntry {
  id: string;
  date: string;
  type: 'HealthCheck';
  specialist: string;
  description: string;
  healthCheckRating: number;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export type NewHospitalEntry = Omit<HospitalEntry, "id">;
export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, "id">;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, "id">;
export type NewEntry = NewHospitalEntry | NewOccupationalHealthcareEntry | NewHealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;