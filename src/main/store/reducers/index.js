import adminReducer from "./admin";
import teacherReducer from "./teacher";
import { combineReducers } from "redux";

const reducers = combineReducers({
    admin: adminReducer,
    teacher: teacherReducer
});

export default reducers;