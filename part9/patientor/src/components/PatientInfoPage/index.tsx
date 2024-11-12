import React, { useEffect } from 'react';
import { Params, useParams } from 'react-router-dom';
import { Gender, Patient } from '../../types';
import patientService from '../../services/patients';
import {Male,Female,HorizontalRule} from '@mui/icons-material';

const PatientInfoPage = () => {
  const parseId = (params: Readonly<Params<string>>): string => {
    if ('id' in params && typeof params.id === 'string') {
      return params.id;
    } else {
      throw new Error('Invalid route parameters: id is missing or not a string');
    }
  };

  const id = parseId(useParams());

  const [patient, setPatient] = React.useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getPatientById(id);
      setPatient(patient);
    };
    fetchPatient();
  }, [id]);

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <h2>
        {patient.name}
        {patient.gender === Gender.Male && <Male />}
        {patient.gender === Gender.Female && <Female />}
        {patient.gender === Gender.Other && <HorizontalRule />}
      </h2>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>Date of Birth: {patient.dateOfBirth}</p>
      <p>Entries: {patient.entries.length === 0 && <>[ ]</>}</p>
    </div>
  );
};

export default PatientInfoPage;