import { Box, Button, Rating, TextField, Typography } from '@mui/material';
import { NewHealthCheckEntry } from '../../../types';
import { useState } from 'react';
import { Favorite } from '@mui/icons-material';

const labels: { [index: string]: string} = {
  0: "The patient is in great shape",
  1: "The patient has a low risk of getting sick",
  2: "The patient has a high risk of getting sick",
  3: "The patient has a diagnosed condition",
};

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

  const [ratingHover, setRatingHover] = useState(-1);

  const getLabelText = (value: number) => {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  };

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
      <Box sx={{ display: "flex", alignItems: "center", mb: 2, border: "1px solid #c0c0c0", borderRadius: "4px", padding: "8px" }}>
        <Rating
          name="healthCheckRating"
          defaultValue={0}
          value={4 - Number(entry.healthCheckRating)}
          max={4}
          getLabelText={getLabelText}
          onChange={(_, value) => setEntry({...entry, healthCheckRating: 4 - Number(value)})}
          onChangeActive={(_, newHover) => {
            if (newHover !== -1) return setRatingHover(4 - newHover);
            setRatingHover(-1);            
          }}
          icon={<Favorite fontSize="inherit" />}
          emptyIcon={<Favorite fontSize="inherit" style={{ opacity: 0.55 }}  />}
        />
        <Box sx={{ ml: 2 }}>{labels[ratingHover !== -1 ? ratingHover : entry.healthCheckRating]}</Box>
      </Box>
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