import { combineReducers } from "redux";

import projectsReducer from "./projects/reducer";
import taskModalReducer from "./taskModal/reducer";
import tasksReducer from "./tasks/reducer";

const rootReducer = combineReducers({
    projectsReducer,
    tasksReducer,
    taskModalReducer,
});

export default rootReducer;
