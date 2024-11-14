import { Button, TextField, Typography } from '@mui/material';
import { NewHealthCheckEntry } from '../../../types';
import { useState } from 'react';

interface HealthCheckEntryFormProps {
  handleSubmit: (event: React.SyntheticEvent, entry: NewHealthCheckEntry) => Promise<void>,
  handleCancel: () => void
}

const HealthCheckEntryForm = ({ handleSubmit, handleCancel }: HealthCheckEntryFormProps) => {
  const [entry, setEntry] = useState<NewHealthCheckEntry>({
    type: 'HealthCheck',
    date: '',
    specialist: '',
    description: '',
    healthCheckRating: 0
  });

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (typeof entry[name as keyof NewHealthCheckEntry] === 'number') {
      setEntry({ ...entry, [name]: parseInt(value) });
    } else {
      setEntry({ ...entry, [name]: value });
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e,entry)}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        New Health Check Entry
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
        label="Health Check Rating"
        name="healthCheckRating"
        value={entry.healthCheckRating.toString()}
        onChange={handleFieldChange}
        type="number"
        inputProps={{ min: 0, max: 10 }}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button type="submit" variant="contained">
        Add Entry
      </Button>
      <Button onClick={handleCancel} variant="outlined">
        Cancel
      </Button>
    </form>
  );
};

export default HealthCheckEntryForm;