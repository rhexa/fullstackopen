import { NewPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (str: unknown): string => {
  if (!isString(str)) {
    throw new Error('Incorrect or missing string: ' + str);
  }
  return str;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing object: ' + object);
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    
    const newPatient: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseString(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseString(object.gender),
      occupation: parseString(object.occupation),
    };
  
    return newPatient;
  }

  if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object) {
    
    const newPatient: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseString(object.dateOfBirth),
      gender: parseString(object.gender),
      occupation: parseString(object.occupation),
    };
  
    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};