import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spot/getAllSpots";
const GET_SPOT = "spot/getSpot";
const NEW_SPOT = "spot/newSpot";

const setSpots = (spots) => ({ type: GET_ALL_SPOTS, payload: spots });
const setSpot = (spot) => ({ type: GET_SPOT, payload: spot });
const newSpot = (spot) => ({ type: NEW_SPOT, payload: spot });

export const getAllSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");
  const data = await res.json();

  if (data.Spots) dispatch(setSpots(data.Spots));
};

export const getAllCurrentUsersSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots/current");
  const data = await res.json();

  if (data.Spots) dispatch(setSpots(data.Spots));
};

export const getSpot = (id) => async (dispatch) => {
  const data = await (await csrfFetch(`/api/spots/${id}`)).json();

  if (data) dispatch(setSpot(data));
};

export const createNewSpot = (formData, imageData) => async (dispatch) => {
  const data = await (
    await csrfFetch(`/api/spots`, {
      method: "POST",
      body: JSON.stringify({
        ...formData,
      }),
    })
  ).json();

  if (data) {
    return dispatch(addSpotImage(data, imageData));
  }
};

export const addSpotImage = (spotData, imageData) => async (dispatch) => {
  if (spotData) {
    if (imageData) {
      spotData.SpotImages = [];
      for (let i = 0; i < imageData.length; i++) {
        if (imageData[i].url) {
          spotData.SpotImages.push(
            await (
              await csrfFetch(`/api/spots/${spotData.id}/images`, {
                method: "POST",
                body: JSON.stringify({
                  url: imageData[i].url,
                }),
              })
            ).json()
          );
        }
      }
    }
    dispatch(newSpot(spotData));
    return spotData.id;
  }
};

const initialState = { allSpots: [], spot: {} };

const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_SPOTS:
      newState = { allSpots: [], ...state.spot };
      newState.allSpots = action.payload;
      return newState;
    case GET_SPOT:
      newState = { ...state.allSpots, spot: {} };
      newState.spot = action.payload;
      return newState;
    case NEW_SPOT:
      newState = state;
      // newState.allSpots = [...state.allSpots, action.payload];
      newState.spot = action.payload;
      return newState;
    default:
      return state;
  }
};

export default spotReducer;
