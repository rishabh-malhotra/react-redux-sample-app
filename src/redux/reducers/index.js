import { combineReducer } from "redux";
import courses from "./courseReducer";

const rootReducer = combineReducer({
  courses: courses
});

export default rootReducer;