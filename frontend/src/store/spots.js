import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spot/getAllSpots";
const GET_SPOT = "spot/getSpot";
const DELETE_SPOT = "spot/deleteSpot";
const UPDATE_REVIEWS = "spot/updateReviews";

const setSpots = (spots) => ({ type: GET_ALL_SPOTS, payload: spots });
const setSpot = (spot) => ({ type: GET_SPOT, payload: spot });
const removeSpot = (id) => ({ type: DELETE_SPOT, payload: id });
export const updateReviews = (stars) => ({
  type: UPDATE_REVIEWS,
  payload: stars,
});

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

export const updateSpot =
  (formData, imageData, id) => async (dispatch) => {
    const data = await (
      await csrfFetch(`/api/spots/${id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      })
    ).json();

    if (data) {
      return dispatch(addSpotImage(data, imageData));
    }
  };

export const deleteSpot = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}`, { method: "DELETE" });
  if (res.ok) {
    return dispatch(removeSpot(id));
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
    dispatch(setSpot(spotData));
    return spotData.id;
  }
};

const initialState = { allSpots: [], spot: {} };

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS:
      return { allSpots: action.payload, ...state.spot };
    case GET_SPOT:
      return { ...state.allSpots, spot: action.payload };
    case DELETE_SPOT:
      return {
        ...state,
        allSpots: state.allSpots.filter(
          (spot) => spot.id !== action.payload
        ),
      };
    case UPDATE_REVIEWS:
      return {
        ...state.allSpots,
        spot: {
          ...state.spot,
          numReviews: state.spot.numReviews + 1,
          avgStarRating:
            state.spot.avgStarRating !== 0
              ? (state.spot.avgStarRating + action.payload) / 2
              : action.payload,
        },
      };
    default:
      return state;
  }
};

export default spotReducer;
