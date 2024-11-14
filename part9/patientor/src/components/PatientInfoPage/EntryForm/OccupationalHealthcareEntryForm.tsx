import { Button, TextField, Typography } from '@mui/material';
import { NewHospitalEntry, NewOccupationalHealthcareEntry } from '../../../types';
import { useState } from 'react';

interface OccupationalHealthcareEntryFormProps {
  handleSubmit: (event: React.SyntheticEvent, entry: NewOccupationalHealthcareEntry) => Promise<void>,
  handleCancel: () => void
}

const OccupationalHealthcareEntryForm = ({ handleSubmit, handleCancel }: OccupationalHealthcareEntryFormProps) => {
  const [entry, setEntry] = useState<NewOccupationalHealthcareEntry>({
    type: 'OccupationalHealthcare',
    date: '',
    specialist: '',
    description: '',
    employerName: '',
    sickLeave: {
      startDate: '',
      endDate: ''
    }
  });

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    if ( name.split('.').length === 2 ) {
      const [parent, child] = name.split('.');
      setEntry({ ...entry, [parent as keyof NewHospitalEntry]: { ...entry[parent as keyof NewOccupationalHealthcareEntry] as object, [child]: value } });
    } else {
      setEntry({ ...entry, [name]: value });
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e,entry)}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        New Occupational Healthcare Entry
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
        label="Employer Name"
        name="employerName"
        value={entry.employerName}
        onChange={handleFieldChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Start Date"
        name="sickLeave.startDate"
        value={entry.sickLeave?.startDate}
        onChange={handleFieldChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="End Date"
        name="sickLeave.endDate"
        value={entry.sickLeave?.endDate}
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

export default OccupationalHealthcareEntryForm;