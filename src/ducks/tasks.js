import data from '../data.json';
import { getMapById, getGroupsBy } from '../helpers/mapHelper'

const initialState = {
    list: data.tasks,
};

initialState.mapById = getMapById(initialState.list);
initialState.mapByGroupId = getGroupsBy(initialState.list, 'groupId');

export const reducer = (state = initialState, action) => {
    return state;
};