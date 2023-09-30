import { combineReducers } from "redux";

import projectsReducer from "./projects/reducer";
import tasksReducer from "./tasks/reducer";

const rootReducer = combineReducers({
    projectsReducer,
    tasksReducer,
});

export default rootReducer;
