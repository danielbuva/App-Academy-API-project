import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spot/getAllSpots";
const GET_SPOT = "spot/getSpot";

const setSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    payload: spots,
  };
};

const setSpot = () => {
  return {
    type: GET_SPOT,
  };
};

export const getAllSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");
  const data = await res.json();

  if (data.Spots) {
    dispatch(setSpots(data.Spots));
  }
};

const initialState = { allSpots: null, spot: {} };

const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_SPOTS:
      newState = { allSpots: {}, ...state.spot };
      newState.allSpots = action.payload;
      return newState;
    case GET_SPOT:
      newState = Object.assign({}, state);
      newState.spot = action.payload;
      return newState;
    default:
      return state;
  }
};

export default spotReducer;
