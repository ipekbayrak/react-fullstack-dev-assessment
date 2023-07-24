
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
    await fetch(`http://localhost:8000/ChangeRecord/${id}`, { method: 'DELETE' });
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
    await fetch('http://localhost:8000/ChangeRecord', { method: 'DELETE' });
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

export const updateChange = (id, updatedChange) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:8000/ChangeRecord/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedChange)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Could not update change.');
    }

    dispatch({
      type: 'UPDATE_CHANGE',
      payload: { id, ...data }
    });
  } catch (error) {
    console.log(error);
  }
};
