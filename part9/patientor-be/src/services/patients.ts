import patientsData from '../data/patients-full';
import { v4 as uuidv4 } from 'uuid';
import { Entry, NewEntry, NewPatient, NonSensitivePatient, nonSensitivePatientSchema, Patient } from '../types';

const patients: Patient[] = patientsData;

const getAll = () : Patient[] => {
  return patients;
};

const getNonSensitivePatients = () : NonSensitivePatient[] => {
  return patients.map(( patient ) => ( nonSensitivePatientSchema.parse(patient) ));
};

const getPatientById = (id: string) : Patient => {
  const patient = patients.find(patient => patient.id === id);
  if (!patient) throw new Error('Patient not found');
  return patient;
};

const addPatient = (newPatient: NewPatient) : Patient=> {
  try {
    const id: string = uuidv4();
    const newPatientWithId = {
      ...newPatient,
      id
    };
    patients.push(newPatientWithId);
    return newPatientWithId;
  } catch (error) {
    throw new Error('Something went wrong: ' + error);    
  }
};

const addEntryToPatient = (id: string, entry: NewEntry) : Entry => {
  const patient = getPatientById(id);
  const newEntryWithId = {
    ...entry,
    id: uuidv4()
  };
  
  patient.entries.push(newEntryWithId);
  return newEntryWithId;
};

export default {
  getAll,
  getNonSensitivePatients,
  getPatientById,
  addPatient,
  addEntryToPatient
};