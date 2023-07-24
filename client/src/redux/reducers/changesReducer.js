const initialState = {
  changes: [],
  editChangeId: null,
  isEditing: false
};

const changesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CHANGES':
      return {
        ...state,
        changes: action.payload
      };
    case 'UPDATE_CHANGE':
      return {
        ...state,
        changes: state.changes.map(change => change._id === action.payload.id ? action.payload : change),
        editChangeId: null,
        isEditing: false
      };
    case 'ADD_CHANGE':
      return {
        ...state,
        changes: state.changes ? [...state.changes, action.payload] : [action.payload]
      };
    case 'DELETE_CHANGE':
      return {
        ...state,
        changes: state.changes.filter(change => change._id !== action.payload)
      };
    case 'DELETE_ALL_CHANGES':
      return {
        ...state,
        changes: []
      };
    case 'SET_EDIT_CHANGE':
      return {
        ...state,
        editChangeId: action.payload,
        isEditing: true
      };
    default:
      return state;
  }
};

export default changesReducer;
