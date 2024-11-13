import { Diagnosis, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../types";
import { assertNever } from "../../utils";
import { Card, CardContent, CardHeader } from '@mui/material';
import { LocalHospital, Work, FavoriteBorder } from '@mui/icons-material';
import HealthRatingBar from "../HealthRatingBar";

const EntryInfo = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {
  const getDiagnosisName = (code: string) => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : '';
  };

  const HospitalType = ({ entry }: { entry: HospitalEntry }) => {
    return (
      <Card variant="outlined" sx={{ marginBottom: 2, backgroundColor: '#fff1d2' }}>
        <CardHeader avatar={<LocalHospital />} title={`${entry.type}`} subheader={entry.date} />
        <CardContent>
          <p><i>{entry.description}</i></p>
          {entry.diagnosisCodes &&
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>{code} {getDiagnosisName(code)}</li>
              ))}
            </ul>
          }
          <p>Discharge: {entry.discharge.date} - {entry.discharge.criteria}</p>
          <p>Diagnosed by {entry.specialist}</p>
        </CardContent>
      </Card>
    );
  };
  
  const OccupationalHealthcareType = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
    return (
      <Card variant="outlined" sx={{ marginBottom: 2, backgroundColor: '#e1f3f8' }}>
        <CardHeader avatar={<Work />} title={`${entry.type} - ${entry.employerName}`} subheader={entry.date} />
        <CardContent>
          <p><i>{entry.description}</i></p>
          {entry.sickLeave && (
            <p>Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>
          )}
          <p>Diagnosed by {entry.specialist}</p>
        </CardContent>
      </Card>
    );
  };
  
  const HealthCheckType = ({ entry }: { entry: HealthCheckEntry }) => {
    return (
      <Card variant="outlined" sx={{ marginBottom: 2, backgroundColor: '#e7f4e4' }}>
        <CardHeader avatar={<FavoriteBorder />} title={entry.type} subheader={entry.date} />
        <CardContent>
          <p><i>{entry.description}</i></p>
          <HealthRatingBar rating={entry.healthCheckRating} showText={true} />
          <p>Diagnosed by {entry.specialist}</p>
        </CardContent>
      </Card>
    );
  };

  switch (entry.type) {
    case 'Hospital':
      return <HospitalType entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareType entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckType entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryInfo;