import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChange, updateChange } from '../redux/actions/changesActions.js';

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
    <div>
      <h2>Editor</h2>
      <div>
        <label>Property A: </label>
        <input data-testid='propertyA' type='number' min='5' max='9' value={propertyA} onChange={e => setPropertyA(Number(e.target.value))} />
      </div>
      <div>
        <label>Property B: </label>
        <select data-testid='propertyB' value={propertyB} onChange={e => setPropertyB(e.target.value)}>
          <option value='value1'>value1</option>
          <option value='value2'>value2</option>
        </select>
      </div>
      <div>
        <label>Property C: </label>
        <input data-testid='propertyC' type='date' value={propertyC} onChange={e => setPropertyC(e.target.value)} />
      </div>
      <button onClick={submitChange}>{isEditing ? 'Update' : 'Submit'}</button>
    </div>
  );
};

export default Editor;
