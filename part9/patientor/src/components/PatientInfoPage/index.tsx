import { useEffect, useState } from 'react';
import { Params, useParams } from 'react-router-dom';
import { Diagnosis, Gender, Patient } from '../../types';
import patientService from '../../services/patients';
import {Male,Female,HorizontalRule} from '@mui/icons-material';
import Entries from './Entries';
import diagnosesService from "../../services/diagnoses";

const PatientInfoPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const parseId = (params: Readonly<Params<string>>): string => {
    if ('id' in params && typeof params.id === 'string') {
      return params.id;
    } else {
      throw new Error('Invalid route parameters: id is missing or not a string');
    }
  };

  const id = parseId(useParams());

  const fetchPatient = async () => {
    const patient = await patientService.getPatientById(id);
    setPatient(patient);
  };

  const fetchDiagnoses = async () => {
    const diagnosesData = await diagnosesService.getAll();
    setDiagnoses(diagnosesData);
  };

  useEffect(() => {
    fetchPatient();
    fetchDiagnoses();
  }, [id]);

  if (!patient) return <div>Loading...</div>;

  
  const data = {
    entries: patient.entries,
    diagnoses
  };
  
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
      <Entries data={data} />
    </div>
  );
};

export default PatientInfoPage;