// requşre axios
import axios from 'axios';

export const setChanges = changes => {
  return {
    type: 'SET_CHANGES',
    payload: changes
  };
};

export const fetchChanges = () => {
  return async dispatch => {
    const response = await fetch('http://localhost:8000/ChangeRecord');
    const changes = await response.json();

    dispatch(setChanges(changes));
  };
};

export const addChange = change => {
  return async dispatch => {
    const response = await fetch('http://localhost:8000/ChangeRecord', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(change)
    });

    if (response.ok) {
      const newChange = await response.json();
      dispatch({
        type: 'ADD_CHANGE',
        payload: newChange
      });
    } else {
      console.error('Failed to add new change', response);
    }
  };
};

export const deleteChange = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8000/ChangeRecord/${id}`);
    dispatch({
      type: 'DELETE_CHANGE',
      payload: id
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllChanges = () => async (dispatch) => {
  try {
    await axios.delete('http://localhost:8000/ChangeRecord');
    dispatch({
      type: 'DELETE_ALL_CHANGES'
    });
  } catch (error) {
    console.log(error);
  }
};

export const setEditChange = (id) => {
  return {
    type: 'SET_EDIT_CHANGE',
    payload: id
  };
};

export const updateChange = (id, updatedChange) => ({
  type: 'UPDATE_CHANGE',
  payload: { id, ...updatedChange }
});
