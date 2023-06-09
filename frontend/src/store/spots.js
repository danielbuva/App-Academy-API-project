import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spot/getAllSpots";
const GET_SPOT = "spot/getSpot";
const DELETE_SPOT = "spot/deleteSpot";
const ADD_REVIEWS = "spot/addStarsAndNumReviews";
const UPDATE_REVIEWS = "spot/updateStarsAndNumReviews";
const DELETE_REVIEW = "spot/deleteStarsAndNumReviews";

const setSpots = (spots) => ({ type: GET_ALL_SPOTS, payload: spots });
const setSpot = (spot) => ({ type: GET_SPOT, payload: spot });
const removeSpot = (id) => ({ type: DELETE_SPOT, payload: id });
const setStarsAndNumReviews = (avgStars) => ({
  type: UPDATE_REVIEWS,
  payload: avgStars,
});
const revertStarsAndNumReviews = (avgStars) => ({
  type: DELETE_REVIEW,
  payload: avgStars,
});

export const addStarsAndNumReviews = (avgStars) => ({
  type: ADD_REVIEWS,
  payload: avgStars,
});

export const updateStarsAndNumReviews = (id) => async (dispatch) => {
  const data = await (
    await csrfFetch(`/api/spots/${id}/avgreviews`)
  ).json();

  if (data && data.avgStarRating) {
    dispatch(setStarsAndNumReviews(data.avgStarRating));
  }
};

export const deleteStarsAndNumReviews = (id) => async (dispatch) => {
  const data = await (
    await csrfFetch(`/api/spots/${id}/avgreviews`)
  ).json();
  if (data && data.avgStarRating) {
    dispatch(revertStarsAndNumReviews(data.avgStarRating));
  }
};

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
      return { allSpots: action.payload, spot: state.spot };
    case GET_SPOT:
      return { allSpots: state.allSpots, spot: action.payload };
    case DELETE_SPOT:
      return {
        allSpots: state.allSpots.filter(
          (spot) => spot.id !== action.payload
        ),
        spot: state.spot,
      };
    case ADD_REVIEWS:
      return {
        allSpots: state.allSpots,
        spot: {
          ...state.spot,
          avgStarRating: action.payload,
          numReviews: state.spot.numReviews + 1,
        },
      };
    case UPDATE_REVIEWS:
      return {
        allSpots: state.allSpots,
        spot: {
          ...state.spot,
          avgStarRating: action.payload,
        },
      };
    case DELETE_REVIEW:
      return {
        allSpots: state.allSpots,
        spot: {
          ...state.spot,
          avgStarRating: action.payload,
          numReviews: state.spot.numReviews - 1,
        },
      };
    default:
      return state;
  }
};

export default spotReducer;
