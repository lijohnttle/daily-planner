import data from '../data.json';
import { getMapById, getGroupsBy } from '../helpers/mapHelper'

export const DELETE_TASK_GROUP = 'DELETE_TASK_GROUP';


const initialState = {
    list: data.taskGroups,
};

initialState.mapById = getMapById(initialState.list);
initialState.mapByDayId = getGroupsBy(initialState.list, 'dayId');

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_TASK_GROUP:
            const taskGroupId = action.payload.taskGroupId;

            const newState = {
                ...state,
                list: state.list.filter(t => t.id !== taskGroupId),
            };

            newState.mapById = getMapById(newState.list);
            newState.mapByDayId = getGroupsBy(newState.list, 'dayId');

            return newState;

        default:
            return state;
    }
};

export const deleteTaskGroup = (taskGroupId) => {
    return {
        type: DELETE_TASK_GROUP,
        payload: {
            taskGroupId,
        }
    }
};