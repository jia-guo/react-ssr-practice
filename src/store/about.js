// action
const REQUEST_ABOUT_LIST = 'ABOUT/REQUEST_ABOUT_LIST';

// action creators
const requestAboutList = (list) => ({
  type: REQUEST_ABOUT_LIST,
  payload: list
});

// state
const defaultState = {
  list: []
};

// async
export const fetchAboutList = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance
      .get('/list')
      .then((resp) => {
        dispatch(requestAboutList(resp.data));
      })
      .catch((e) => console.log('-----> from thunk mw: ', 'about', e.message));
  };
};

// reducer
export default function aboutReducer(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_ABOUT_LIST:
      return {
        ...state,
        list: action.payload
      };
    default:
      return state;
  }
}
