import data from '../data.json';
import { getMapById, getGroupsBy } from '../helpers/mapHelper'

const initialState = {
    list: data.taskGroups,
};

initialState.mapById = getMapById(initialState.list);
initialState.mapByDayId = getGroupsBy(initialState.list, 'dayId');

export const reducer = (state = initialState, action) => {
    return state;
};