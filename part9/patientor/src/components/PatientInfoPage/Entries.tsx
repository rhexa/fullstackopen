import { Entry, Diagnosis } from "../../types";
import EntryInfo from "./EntryInfo";

interface Data {
  entries: Entry[],
  diagnoses: Diagnosis[]
}

const Entries = ({ data }: { data: Data}) => {
  const { entries, diagnoses } = data;

  return (
    <>
      <h3>Entries</h3>
      {entries.map((entry) => (
        <EntryInfo key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </>
  );
};

export default Entries;