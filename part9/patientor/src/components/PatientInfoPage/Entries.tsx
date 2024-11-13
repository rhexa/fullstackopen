import { Entry } from "../../types";
import EntryInfo from "./EntryInfo";

const Entries = ({ entries }: { entries: Entry[]}) => {
  return (
    <>
      <h3>Entries</h3>
      {entries.map((entry) => (
        <EntryInfo key={entry.id} entry={entry} />
      ))}
    </>
  );
};

export default Entries;