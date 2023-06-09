import { csrfFetch } from "./csrf";

const GET_REVIEW = "spot/getREVIEW";

const setReviews = (reviews) => ({ type: GET_REVIEW, payload: reviews });

export const getReviews = (id) => async (dispatch) => {
  const data = await (await csrfFetch(`/api/spots/${id}/reviews`)).json();
  if (data && data.Reviews) dispatch(setReviews(data.Reviews));
};

const initialState = { reviews: [] };

const reviewReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_REVIEW:
      newState = { reviews: [] };
      newState.reviews = action.payload;
      return newState;
    default:
      return state;
  }
};

export default reviewReducer;
