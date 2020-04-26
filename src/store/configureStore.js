  
import { createStore, combineReducers } from 'redux';
import taskGroups from '../ducks/taskGroups';
import tasks from '../ducks/tasks';

const reducer = combineReducers({
    taskGroups: taskGroups,
    tasks: tasks
});

const configureStore = initialState => createStore(reducer, initialState);

export default configureStore;