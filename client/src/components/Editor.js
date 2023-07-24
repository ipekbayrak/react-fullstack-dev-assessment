import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChange, updateChange } from '../redux/actions/changesActions.js';
import { MenuItem, Typography, Slider, TextField, Button, Select, InputLabel, FormControl, Box } from '@mui/material';

// Inside the Editor component...
const marks = [
  {
    value: 5,
    label: '5'
  },
  {
    value: 6,
    label: '6'
  },
  {
    value: 7,
    label: '7'
  },
  {
    value: 8,
    label: '8'
  },
  {
    value: 9,
    label: '9'
  }
];

const Editor = () => {
  const [propertyA, setPropertyA] = useState(5);
  const [propertyB, setPropertyB] = useState('value1');
  const [propertyC, setPropertyC] = useState(new Date().toISOString().slice(0, 10));
  const dispatch = useDispatch();

  const isEditing = useSelector(state => state.changes.isEditing);
  const editChangeId = useSelector(state => state.changes.editChangeId);
  const changes = useSelector(state => state.changes.changes);

  useEffect(() => {
    if (isEditing) {
      const changeToEdit = changes.find(change => change._id === editChangeId);
      setPropertyA(changeToEdit.propertyA);
      setPropertyB(changeToEdit.propertyB);
      setPropertyC(changeToEdit.propertyC.slice(0, 10));
    }
  }, [isEditing, editChangeId, changes]);

  const submitChange = () => {
    const newChange = { propertyA, propertyB, propertyC };

    if (isEditing) {
      dispatch(updateChange(editChangeId, newChange));
    } else {
      dispatch(addChange(newChange));
    }
  };

  return (
    <Box sx={{ m: 4 }}>
      <h2>Editor</h2>
      <Box sx={{ mb: 2 }}>
        <Typography id='propertyA-label'>Property A</Typography>
        <Slider
          id='propertyA'
          aria-labelledby='propertyA-label'
          step={1}
          marks={marks}
          min={5}
          max={9}
          data-testid='propertyA'
          valueLabelDisplay='auto'
          value={propertyA}
          onChange={(event, value) => setPropertyA(value)}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth>
          <InputLabel id='propertyB-label'>Property B</InputLabel>
          <Select
            labelId='propertyB-label'
            id='propertyB'
            data-testid='propertyB'
            value={propertyB}
            onChange={e => setPropertyB(e.target.value)}
          >
            <MenuItem value='value1'>value1</MenuItem>
            <MenuItem value='value2'>value2</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField data-testid='propertyC' id='propertyC' type='date' label='Property C' InputLabelProps={{ shrink: true }} value={propertyC} onChange={e => setPropertyC(e.target.value)} fullWidth />
      </Box>
      <Button variant='contained' color='primary' onClick={submitChange}>
        {isEditing ? 'Update' : 'Submit'}
      </Button>
    </Box>
  );
};

export default Editor;
