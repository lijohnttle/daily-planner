import data from '../data.json';
import { getMapById } from '../utils/mapHelper'

const initialState = {
    list: data.days,
};

initialState.mapById = getMapById(initialState.list);

export const reducer = (state = initialState, action) => {
    return state;
};