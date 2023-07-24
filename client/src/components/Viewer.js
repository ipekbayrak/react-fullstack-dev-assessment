import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChanges, deleteChange, deleteAllChanges, setEditChange } from '../redux/actions/changesActions.js';
import { useNavigate } from 'react-router-dom';

const Viewer = () => {
  const dispatch = useDispatch();
  const changes = useSelector(state => state.changes);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchChanges());
  }, []);

  return (
    <div>
      <h2>Viewer</h2>
      <button onClick={() => dispatch(deleteAllChanges())}>Delete All</button>

      {changes && changes.changes && changes.changes.map((change, index) => (
        <div key={index}>
          <p>Property A: {change.propertyA}</p>
          <p>Property B: {change.propertyB}</p>
          <p>Property C: {new Date(change.propertyC).toLocaleDateString()}</p>
          <button data-testid='delete' onClick={() => dispatch(deleteChange(change._id))}>Delete</button>
          <button onClick={() => {
            dispatch(setEditChange(change._id));
            navigate('/');
          }}
          >Edit
          </button>

        </div>
      ))}
    </div>
  );
};

export default Viewer;
