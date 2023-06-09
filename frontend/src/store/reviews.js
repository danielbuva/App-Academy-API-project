import { csrfFetch } from "./csrf";

const GET_REVIEW = "spot/getReview";
const ADD_REVIEW = "spot/newReview";

const setReviews = (reviews) => ({ type: GET_REVIEW, payload: reviews });
const addReview = (review) => ({ type: ADD_REVIEW, payload: review });

export const getReviews = (id) => async (dispatch) => {
  const data = await (await csrfFetch(`/api/spots/${id}/reviews`)).json();
  if (data && data.Reviews) dispatch(setReviews(data.Reviews));
};

export const createReview = (id, review, user) => async (dispatch) => {
  const data = await (
    await csrfFetch(`/api/spots/${id}/reviews`, {
      method: "POST",
      body: JSON.stringify(review),
    })
  ).json();

  if (data) {
    data.User = user;
    dispatch(addReview(data));
  }
};

const initialState = { reviews: [] };

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEW:
      return { reviews: action.payload };
    case ADD_REVIEW:
      return { reviews: [...state.reviews, action.payload] };
    default:
      return state;
  }
};

export default reviewReducer;
