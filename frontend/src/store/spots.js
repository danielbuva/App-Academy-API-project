import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spot/getAllSpots";
const GET_SPOT = "spot/getSpot";

const setSpots = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    payload: spots,
  };
};

const setSpot = (spot) => {
  return {
    type: GET_SPOT,
    payload: spot,
  };
};

export const getAllSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");
  const data = await res.json();

  if (data.Spots) {
    dispatch(setSpots(data.Spots));
  }
};

export const getSpot = (id) => async (dispatch) => {
  const data = await (await csrfFetch(`/api/spots/${id}`)).json();

  if (data) {
    dispatch(setSpot(data));
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
      newState = { ...state.allSpots, spot: {} };
      newState.spot = action.payload;
      return newState;
    default:
      return state;
  }
};

export default spotReducer;
