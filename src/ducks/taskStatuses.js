export const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS';

export const reducer = (state = { }, action) => {
    switch (action.type) {
        case CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.payload.taskId]: action.payload.taskStatus,
            }
        
        default:
            return state;
    }
};

export const changeTaskStatus = (taskId, taskStatus) => {
    return {
        type: CHANGE_TASK_STATUS,
        payload: {
            taskId,
            taskStatus
        }
    }
};