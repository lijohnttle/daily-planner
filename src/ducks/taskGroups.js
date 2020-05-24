import data from '../data.json';
import { getMapById, getGroupsBy } from '../utils/mapHelper'

export const ADD_TASK_GROUP = 'ADD_TASK_GROUP';
export const CHANGE_TASK_GROUP = 'CHANGE_TASK_GROUP';
export const DELETE_TASK_GROUP = 'DELETE_TASK_GROUP';


const initialState = {
    list: data.taskGroups,
};

initialState.mapById = getMapById(initialState.list);
initialState.mapByDayId = getGroupsBy(initialState.list, 'dayId');

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK_GROUP:
            {
                const newState = {
                    ...state,
                };
            }

        case CHANGE_TASK_GROUP:
            {
                const changes = action.payload.changes;
                const taskGroupId = changes.id;
                const oldTaskGroup = state.mapById[taskGroupId];

                if (!oldTaskGroup) {
                    return state;
                }

                const newTaskGroup = {
                    ...oldTaskGroup,
                    ...changes,
                };

                const newState = {
                    list: state.list.map(taskGroup => taskGroup.id === taskGroupId ? newTaskGroup : taskGroup),
                    mapById: {
                        ...state.mapById,
                        [newTaskGroup.id]: newTaskGroup,
                    },
                    mapByDayId: {
                        ...state.mapByDayId,
                        [newTaskGroup.dayId]: state.mapByDayId[newTaskGroup.dayId].map(taskGroup => taskGroup.id === taskGroupId ? newTaskGroup : taskGroup),
                    },
                };

                return newState;
            }

        case DELETE_TASK_GROUP:
            {
                const taskGroupId = action.payload.taskGroupId;

                const newState = {
                    ...state,
                    list: state.list.filter(t => t.id !== taskGroupId),
                };

                // update mappings
                delete newState.mapById[taskGroupId];

                newState.mapById = getMapById(newState.list);
                newState.mapByDayId = getGroupsBy(newState.list, 'dayId');

                return newState;
            }
    
        default:
            return state;
    }
};

export const addTaskGroup = (dayId) => {
    return {
        type: ADD_TASK_GROUP,
        payload: {
            dayId,
        }
    };
};

export const changeTaskGroup = (changes) => {
    return {
        type: CHANGE_TASK_GROUP,
        payload: {
            changes: changes
        }
    };
};

export const deleteTaskGroup = (taskGroupId) => {
    return {
        type: DELETE_TASK_GROUP,
        payload: {
            taskGroupId,
        }
    };
};