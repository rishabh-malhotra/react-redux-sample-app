import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";
export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case actionTypes.CREATE_COURSE:
      return [...state, { ...action.course }];
    case actionTypes.LOAD_COURSES_SUCCESS:
      console.log(action.courses);
      return action.courses;
    default:
      return state;
  }
}
