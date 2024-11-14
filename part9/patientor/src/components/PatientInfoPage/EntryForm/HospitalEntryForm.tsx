import { Button, TextField, Typography } from '@mui/material';
import { NewHospitalEntry } from '../../../types';
import { useState } from 'react';

interface HospitalEntryFormProps {
  handleSubmit: (event: React.SyntheticEvent, entry: NewHospitalEntry) => Promise<void>,
  handleCancel: () => void
}

const HospitalEntryForm = ({ handleSubmit, handleCancel }: HospitalEntryFormProps) => {
  const [entry, setEntry] = useState<NewHospitalEntry>({
    type: 'Hospital',
    date: '',
    specialist: '',
    description: '',
    diagnosisCodes: [],
    discharge: {
      date: '',
      criteria: '',
    }
  });

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'diagnosisCodes') {
      setEntry({ ...entry, diagnosisCodes: value.split(',') });
    } else if ( name.split('.').length === 2 ) {
      const [parent, child] = name.split('.');
      setEntry({ ...entry, [parent as keyof NewHospitalEntry]: { ...entry[parent as keyof NewHospitalEntry] as object, [child]: value } });
    } else {
      setEntry({ ...entry, [name]: value });
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e,entry)}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        New Hospital Entry
      </Typography>
      <TextField
        label="Date"
        name="date"
        value={entry.date}
        onChange={handleFieldChange}
        type="date"
        InputLabelProps={{ shrink: true }}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Specialist"
        name="specialist"
        value={entry.specialist}
        onChange={handleFieldChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Description"
        name="description"
        value={entry.description}
        onChange={handleFieldChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Diagnosis Codes"
        name="diagnosisCodes"
        value={entry.diagnosisCodes.join(', ')}
        onChange={handleFieldChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Discharge Date"
        name="discharge.date"
        value={entry.discharge.date}
        onChange={handleFieldChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Discharge Criteria"
        name="discharge.criteria"
        value={entry.discharge.criteria}
        onChange={handleFieldChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" type="submit">
        Add Entry
      </Button>
      <Button variant="outlined" onClick={handleCancel}>
        Cancel
      </Button>
    </form>
  );
};

export default HospitalEntryForm;