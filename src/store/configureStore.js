  
import { createStore, combineReducers } from 'redux';
import daysReducer from '../ducks/days';
import taskGroupsReducer from '../ducks/taskGroups';
import tasksReducer from '../ducks/tasks';
import { reducer as TaskStatusesReducer } from '../ducks/taskStatuses';

const reducer = combineReducers({
    days: daysReducer,
    taskGroups: taskGroupsReducer,
    tasks: tasksReducer,
    taskStatuses: TaskStatusesReducer,
});

const configureStore = initialState => createStore(reducer, initialState);

export default configureStore;