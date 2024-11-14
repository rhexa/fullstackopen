import { Autocomplete, Button, InputLabel, TextField, Typography } from '@mui/material';
import { Diagnosis, NewHospitalEntry, NewOccupationalHealthcareEntry } from '../../../types';
import { useState } from 'react';

interface OccupationalHealthcareEntryFormProps {
  handleSubmit: (event: React.SyntheticEvent, entry: NewOccupationalHealthcareEntry) => Promise<void>,
  handleCancel: () => void,
  diagnoses: Diagnosis[]
}

const OccupationalHealthcareEntryForm = ({ handleSubmit, handleCancel, diagnoses }: OccupationalHealthcareEntryFormProps) => {
  const [entry, setEntry] = useState<NewOccupationalHealthcareEntry>({
    type: 'OccupationalHealthcare',
    date: '',
    specialist: '',
    description: '',
    diagnosisCodes: [],
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
      <Autocomplete
        multiple
        id="tags-outlined"
        options={diagnoses}
        getOptionLabel={(diagnosis: Diagnosis) => diagnosis.code}
        filterSelectedOptions
        value={entry.diagnosisCodes.map((code) => {
          const diagnosis = diagnoses.find((d) => d.code === code);
          return diagnosis ? diagnosis : { code: '', name: '' };
        })}
        onChange={(_, data) => {
          setEntry({
            ...entry,
            diagnosisCodes: data.map((d) => d.code),
          });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Diagnosis Codes"
            placeholder="Diagnosis Codes"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        )}
      />
      <TextField
        label="Employer Name"
        name="employerName"
        value={entry.employerName}
        onChange={handleFieldChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <InputLabel sx={{ marginBottom: 2 }}>Sick Leave</InputLabel>
      <TextField
        label="Start Date"
        name="sickLeave.startDate"
        value={entry.sickLeave?.startDate}
        onChange={handleFieldChange}
        type="date"
        InputLabelProps={{ shrink: true }}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="End Date"
        name="sickLeave.endDate"
        value={entry.sickLeave?.endDate}
        onChange={handleFieldChange}
        type="date"
        InputLabelProps={{ shrink: true }}
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