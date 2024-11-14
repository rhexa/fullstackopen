import React, { useState } from 'react';
import { EntryType, Message, NewEntry } from '../../../types';
import { Box, Button, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import patientsService from '../../../services/patients';
import { useParams } from 'react-router-dom';
import { assertNever, parseId } from '../../../utils';
import axios from 'axios';
import Notification from '../../Notification';
import z from 'zod';
import HospitalEntryForm from './HospitalEntryForm';
import OccupationalHealthcareEntryForm from './OccupationalHealthcareEntryForm';
import HealthCheckEntryForm from './HealthCheckEntryForm';

const EntryForm = () => {
  const id = parseId(useParams());

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [message, setMessage] = useState<Message>({ value: '', type: 'success' });
  const [entryType, setEntryType] = useState<keyof typeof EntryType>(EntryType.Hospital);

  const handleSubmit = async (event: React.SyntheticEvent, entry: NewEntry): Promise<void> => {
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

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
  };

  const handleEntryTypeChange = (event: SelectChangeEvent) => {
    const value = event.target.value as keyof typeof EntryType;

    if (Object.keys(EntryType).includes(value)) {
      setEntryType(value);
    }
  };

  const FormSwitcher = () => {
    switch (EntryType[entryType]) {
      case EntryType.Hospital:
        return (<HospitalEntryForm handleCancel={handleCancel} handleSubmit={handleSubmit} />);
      case EntryType.OccupationalHealthcare:
        return (<OccupationalHealthcareEntryForm handleCancel={handleCancel} handleSubmit={handleSubmit} />);
      case EntryType.HealthCheck:
        return (<HealthCheckEntryForm handleCancel={handleCancel} handleSubmit={handleSubmit} />);
      default:
        console.log('assertNever');
        assertNever(EntryType[entryType]);
    }
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
          <Select value={entryType} onChange={handleEntryTypeChange} sx={{ mb:2 }}>
            {Object.entries(EntryType).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
          <FormSwitcher />
        </Box>
      )}
    </>
  );
};

export default EntryForm;