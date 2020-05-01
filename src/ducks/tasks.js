import data from '../data.json';
import { getMapById, getGroupsBy } from '../helpers/mapHelper'

const CHANGE_TASK = 'CHANGE_TASK';
const DELETE_TASK = 'DELETE_TASK';


const initialState = {
    list: data.tasks,
};

initialState.mapById = getMapById(initialState.list);
initialState.mapByGroupId = getGroupsBy(initialState.list, 'groupId');

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_TASK:
            {
                const changes = action.payload.changes;
                const taskId = changes.id;
                const oldTask = state.mapById[taskId];

                if (!oldTask) {
                    return state;
                }

                const newTask = {
                    ...oldTask,
                    ...changes,
                };

                const newState = {
                    ...state,
                    list: state.list.map(task => task.id === taskId ? newTask : task),
                    mapById: {
                        ...state.mapById,
                        [newTask.id]: newTask,
                    },
                    mapByGroupId: {
                        ...state.mapByGroupId,
                        [newTask.groupId]: state.mapByGroupId[newTask.groupId].map(task => task.id === taskId ? newTask : task),
                    },
                };

                return newState;
            }

        case DELETE_TASK:
            {
                const taskId = action.payload.taskId;

                const newState = {
                    ...state,
                    list: state.list.filter(t => t.id !== taskId),
                };

                newState.mapById = getMapById(newState.list);
                newState.mapByGroupId = getGroupsBy(newState.list, 'groupId');

                return newState;
            }
        
        default:
            return state;
    }
};

export const changeTask = changes => {
    return {
        type: CHANGE_TASK,
        payload: {
            changes: changes
        }
    }
};

export const deleteTask = taskId => {
    return {
        type: DELETE_TASK,
        payload: {
            taskId: taskId
        }
    }
};