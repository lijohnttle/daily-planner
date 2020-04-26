  
import { createStore, combineReducers } from 'redux';
import daysReducer from '../ducks/days';
import taskGroupsReducer from '../ducks/taskGroups';
import tasksReducer from '../ducks/tasks';

const reducer = combineReducers({
    days: daysReducer,
    taskGroups: taskGroupsReducer,
    tasks: tasksReducer,
});

const configureStore = initialState => createStore(reducer, initialState);

export default configureStore;