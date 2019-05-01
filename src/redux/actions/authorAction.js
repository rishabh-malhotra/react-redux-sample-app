import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import {beginApiCall, apiCallError} from "./apiStatusAction"
export function createCourse(course) {
  return { type: types.CREATE_COURSE, course: course };
}
export function loadAuthorsSuccess(authors) {
  return {
    type: types.LOAD_AUTHORS_SUCCESS,
    authors
  };
}

export function loadAuthors() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then(authors => dispatch(loadAuthorsSuccess(authors)))
      .catch(error => {
        dispatch(apiCallError(error))
        throw error;
      });
  };
}
