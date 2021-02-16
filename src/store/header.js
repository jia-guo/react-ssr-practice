// action
const REQUEST_GREET_MSG = 'HEADER/REQUEST_GREET_MSG';

// action creator
const requestGreetMsg = (msg) => ({
  type: REQUEST_GREET_MSG,
  payload: msg
});

// async
export const fetchGreeMsg = () => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance
      .get('/greeting')
      .then((resp) => {
        if (resp.data) {
          dispatch(requestGreetMsg(resp.data.msg));
        }
      })
      .catch((e) => {
        console.log('-----> from thunk mw: ', e.message);
        // can dispatch REQ_FAILURE if want to reset state
      });
  };
};

// state
const defaultState = {
  msg: 'Warm welcome to everyone!'
};

// reducer
export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_GREET_MSG:
      return { msg: action.payload };
    default:
      return state;
  }
}
