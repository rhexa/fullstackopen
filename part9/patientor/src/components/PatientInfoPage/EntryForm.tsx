import React, { useState } from 'react';
import { Message, NewHospitalEntry } from '../../types';
import { Box, Button, TextField, Typography } from '@mui/material';
import patientsService from '../../services/patients';
import { useParams } from 'react-router-dom';
import { parseId } from '../../utils';
import axios from 'axios';
import Notification from '../Notification';
import z from 'zod';

const EntryForm = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [message, setMessage] = useState<Message>({ value: '', type: 'success' });
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

  const id = parseId(useParams());

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await patientsService.addEntry(id, entry);
      setIsFormVisible(false);
    } catch (error) {
      const parseZodIssuesFromError = (error: unknown): z.ZodIssue[] => {
        if (!axios.isAxiosError(error)) return [];
        if (!error.response) return [];
        if (!error.response.data) return [];
        if (!error.response.data.error) return [];
        if (
          Array.isArray(error.response.data.error)
        ) return error.response.data.error;
        return [];
      };

      const datas = parseZodIssuesFromError(error);
      if (datas.length < 1) console.log("hello");
      const errors = datas.map((d) => {
        const path = d.path.join('.');
        return `${path}: ${d.message}`;
      });
      setMessage({ value: errors.join('.\n '), type: 'error' });
    }
  };

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

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
  };

  return (
    <>
      <Notification message={message} setMessage={setMessage} />
      {!isFormVisible ? (
        <Button variant="contained" onClick={toggleForm}>
          Add New Entry
        </Button>
      ) : (
        <Box sx={{ padding: 2, backgroundColor: '#fff', borderRadius: 1, boxShadow: 1 }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Add New Entry
            </Typography>
            <TextField
              label="Type"
              name="type"
              value={entry.type}
              onChange={handleFieldChange}
              inputProps={{ readOnly: true }}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
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
        </Box>
      )}
    </>
  );
};

export default EntryForm;