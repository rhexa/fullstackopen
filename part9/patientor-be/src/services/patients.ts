import patients from '../data/patients';
import { Patient, nonSensitivePatientData } from '../types';

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

export default {
  getAll,
  getNonSensitivePatients
};