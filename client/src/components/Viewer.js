import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChanges, deleteChange, deleteAllChanges, setEditChange } from '../redux/actions/changesActions.js';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Card, CardContent, CardActions } from '@mui/material';

const Viewer = () => {
  const dispatch = useDispatch();
  const changes = useSelector(state => state.changes);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchChanges());
  }, []);

  return (
    <Box sx={{ m: 4 }}>
      <Typography variant='h2'>Viewer</Typography>
      <Box sx={{ my: 2 }}>
        <Button variant='contained' color='secondary' onClick={() => dispatch(deleteAllChanges())}>
          Delete All
        </Button>
      </Box>

      {changes && changes.changes && changes.changes.map((change, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant='body1'>Property A: {change.propertyA}</Typography>
            <Typography variant='body1'>Property B: {change.propertyB}</Typography>
            <Typography variant='body1'>Property C: {new Date(change.propertyC).toLocaleDateString()}</Typography>
          </CardContent>
          <CardActions>
            <Button variant='outlined' color='error' data-testid='delete' onClick={() => dispatch(deleteChange(change._id))}>Delete</Button>
            <Button
              variant='outlined' color='primary' onClick={() => {
                dispatch(setEditChange(change._id));
                navigate('/');
              }}
            >
              Edit
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default Viewer;
