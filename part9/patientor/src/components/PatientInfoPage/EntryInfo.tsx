import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../types";
import { assertNever } from "../../utils";

const EntryInfo = ({ entry }: { entry: Entry }) => {
  const HospitalType = ({ entry }: { entry: HospitalEntry }) => {
    return (
      <div>
        <p>{entry.date} <i>{entry.description}</i></p>
        {entry.diagnosisCodes &&
          <ul>
            {entry.diagnosisCodes.map((code) => (
              <li key={code}>{code}</li>
            ))}
          </ul>
        }
      </div>
    );
  };
  
  const OccupationalHealthcareType = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
    return (
      <div>
        <p>{entry.date} {entry.description}</p>
      </div>
    );
  };
  
  const HealthCheckType = ({ entry }: { entry: HealthCheckEntry }) => {
    return (
      <div>
        <p>{entry.date} {entry.description}</p>
      </div>
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