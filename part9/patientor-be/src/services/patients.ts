import patientsData from '../data/patients';
import { v4 as uuidv4 } from 'uuid';
import { NewPatient, Patient, nonSensitivePatientData } from '../types';

const patients: Patient[] = patientsData as Patient[];

const getAll = () : Patient[] => {
  return patients;
};

const getNonSensitivePatients = () : nonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
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

export default {
  getAll,
  getNonSensitivePatients,
  addPatient
};