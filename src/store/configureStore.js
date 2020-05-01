  
import { createStore, combineReducers } from 'redux';
import { reducer as DaysReducer } from '../ducks/days';
import { reducer as TaskGroupsReducer } from '../ducks/taskGroups';
import { reducer as TasksReducer } from '../ducks/tasks';
import { reducer as TaskStatusesReducer } from '../ducks/taskStatuses';

const reducer = combineReducers({
    days: DaysReducer,
    taskGroups: TaskGroupsReducer,
    tasks: TasksReducer,
    taskStatuses: TaskStatusesReducer,
});

const configureStore = () => createStore(reducer);

export default configureStore;