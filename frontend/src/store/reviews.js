import { csrfFetch } from "./csrf";
import {
  addStarsAndNumReviews,
  deleteStarsAndNumReviews,
  updateStarsAndNumReviews,
} from "./spots";

const GET_REVIEW = "spot/getReview";
const ADD_REVIEW = "spot/newReview";
const SET_REVIEW = "review/setReview";
const DELETE_REVIEW = "review/removeReview";
const EDIT_REVIEW = "review/editReview";

const setReviews = (reviews) => ({ type: GET_REVIEW, payload: reviews });
const addReview = (review) => ({ type: ADD_REVIEW, payload: review });
export const setReview = (review) => ({
  type: SET_REVIEW,
  payload: review,
});
const removeReview = (id) => ({ type: DELETE_REVIEW, payload: id });
const editReview = (review) => ({ type: EDIT_REVIEW, payload: review });

export const getReviews = (id) => async (dispatch) => {
  const data = await (await csrfFetch(`/api/spots/${id}/reviews`)).json();
  if (data && data.Reviews) dispatch(setReviews(data.Reviews));
};

export const createReview =
  (id, spotId, review, user) => async (dispatch) => {
    const data = await (
      await csrfFetch(`/api/spots/${id}/reviews`, {
        method: "POST",
        body: JSON.stringify(review),
      })
    ).json();

    if (data) {
      data.User = user;
      dispatch(fetchAvgReviewsAfterCreation(spotId));
      dispatch(addReview(data));
    }
  };

const fetchAvgReviewsAfterCreation = (spotId) => async (dispatch) => {
  const data = await (
    await csrfFetch(`/api/spots/${spotId}/avgreviews`)
  ).json();

  if (data && data.avgStarRating) {
    dispatch(addStarsAndNumReviews(data.avgStarRating));
  }
};

export const deleteReview = (id, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${id}`, { method: "DELETE" });
  if (res.ok) {
    dispatch(deleteStarsAndNumReviews(spotId));
    dispatch(removeReview(id));
  }
};

export const updateReview =
  (id, editedReview, user, prevStars, spotId) => async (dispatch) => {
    const data = await (
      await csrfFetch(`/api/reviews/${id}`, {
        method: "PUT",
        body: JSON.stringify(editedReview),
      })
    ).json();
    if (data) {
      data.User = user;
      dispatch(updateStarsAndNumReviews(spotId));
      dispatch(editReview(data));
    }
  };

const initialState = { review: {}, reviews: [] };

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEW:
      return { review: state.review, reviews: action.payload };
    case ADD_REVIEW:
      return {
        review: state.review,
        reviews: [...state.reviews, action.payload],
      };
    case SET_REVIEW:
      return { review: action.payload, reviews: state.reviews };
    case DELETE_REVIEW:
      return {
        review: {},
        reviews: state.reviews.filter((r) => r.id !== action.payload),
      };
    case EDIT_REVIEW:
      return {
        review: {},
        reviews: [
          ...state.reviews.filter((r) => r.id !== action.payload.id),
          action.payload,
        ],
      };
    default:
      return state;
  }
};

export default reviewReducer;
