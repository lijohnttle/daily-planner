import data from '../data.json';
import { getMapById, getGroupsBy } from '../utils/mapHelper'

const CHANGE_TASK = 'CHANGE_TASK';
const DELETE_TASK = 'DELETE_TASK';
const MOVE_TASK_UP = 'MOVE_TASK_UP';
const MOVE_TASK_DOWN = 'MOVE_TASK_DOWN';


const updateOrders = (taskList) => {
    const orderedTaskList = taskList.sort((task1, task2) => task1.order - task2.order);

    orderedTaskList.forEach((task, index) => {
        task.order = index;
    });
};

const initialState = {
    list: data.tasks,
};

initialState.mapById = getMapById(initialState.list);
initialState.mapByGroupId = getGroupsBy(initialState.list, 'groupId');

(function updateOrdersForAllTasks() {
    for (let taskGroupId in initialState.mapByGroupId) {
        updateOrders(initialState.mapByGroupId[taskGroupId]);
    }
})();

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
                const task = state.mapById[taskId];
                const taskGroupId = task.groupId;

                const newState = {
                    ...state,
                    list: state.list.filter(t => t.id !== taskId),
                };

                // update mappings
                delete newState.mapById[task.id];

                let tasksWithingGroup = newState.mapByGroupId[taskGroupId].filter(t => t.id !== taskId);
                updateOrders(tasksWithingGroup);
                newState.mapByGroupId[taskGroupId] = tasksWithingGroup;

                return newState;
            }

        case MOVE_TASK_UP:
        case MOVE_TASK_DOWN:
            {
                const taskId = action.payload.taskId;
                const task = state.mapById[taskId];

                const newState = {
                    list: [
                        ...state.list
                    ],
                    mapById: {
                        ...state.mapById,
                    },
                    mapByGroupId: {
                        ...state.mapByGroupId,
                    },
                };

                const taskGroupId = task.groupId;
                const tasksWithinGroup = state.mapByGroupId[taskGroupId];
                const newOrder = task.order + (action.type === MOVE_TASK_UP ? -1 : 1);
                const swapTask = tasksWithinGroup.find(t => t.order === newOrder);
                
                if (swapTask) {
                    swapTask.order = task.order;
                    task.order = newOrder;

                    newState.mapByGroupId[taskGroupId] = [
                        ...tasksWithinGroup
                    ];
                }
                
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

export const moveTaskUp = taskId => {
    return {
        type: MOVE_TASK_UP,
        payload: {
            taskId: taskId
        }
    }
};

export const moveTaskDown = taskId => {
    return {
        type: MOVE_TASK_DOWN,
        payload: {
            taskId: taskId
        }
    }
};