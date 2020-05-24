import data from '../data.json';
import { getMapById, getGroupsBy } from '../utils/mapHelper'

export const ADD_TASK = 'ADD_TASK';
export const CHANGE_TASK = 'CHANGE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const MOVE_TASK_UP = 'MOVE_TASK_UP';
export const MOVE_TASK_DOWN = 'MOVE_TASK_DOWN';

export const reducer = (state = populateInitialState(data), action) => {
    switch (action.type) {
        case ADD_TASK:
            {
                const newTask = {
                    id: (state.list || []).reduce((maxId, task) => Math.max(maxId, task.id), -1) + 1,
                    name: 'New Task',
                    duration: null,
                    priority: 'high',
                    groupId: action.payload.taskGroupId,
                    order: -1,
                };

                const newState = {
                    list: replaceTaskInList(newTask.id, newTask, state.list || []),
                    mapById: replaceTaskInMapById(newTask.id, newTask, state.mapById || { }),
                    mapByGroupId: replaceTaskInGroup(newTask.id, newTask, newTask.groupId, state.mapByGroupId || { }),
                };

                return newState;
            }

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
                    list: replaceTaskInList(taskId, newTask, state.list),
                    mapById: replaceTaskInMapById(taskId, newTask, state.mapById),
                    mapByGroupId: replaceTaskInGroup(taskId, newTask, newTask.groupId, state.mapByGroupId),
                };

                return newState;
            }

        case DELETE_TASK:
            {
                const taskId = action.payload.taskId;
                const task = state.mapById[taskId];

                const newState = {
                    list: replaceTaskInList(taskId, null, state.list),
                    mapById: replaceTaskInMapById(taskId, null, state.mapById),
                    mapByGroupId: replaceTaskInGroup(taskId, null, task.groupId, state.mapByGroupId),
                };

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

                    newState.mapByGroupId[taskGroupId] = updateOrders(tasksWithinGroup);
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

export const addTask = (taskGroupId) => {
    return {
        type: ADD_TASK,
        payload: {
            taskGroupId,
        }
    }
};

function populateInitialState(data) {
    const state = { };
    state.list = data.tasks;
    state.mapById = getMapById(state.list);
    state.mapByGroupId = getGroupsBy(state.list, 'groupId');

    // update orders
    for (let taskGroupId in state.mapByGroupId) {
        state.mapByGroupId[taskGroupId] = updateOrders(state.mapByGroupId[taskGroupId]);
    }

    return state;
};

function updateOrders(taskList) {
    return taskList
        .sort((task1, task2) => {
            if (task1.order === -1) {
                if (task2.order === -1) {
                    return 0;
                }

                return 1;
            }

            if (task2.order === -1) {
                return -1;
            }

            return task1.order - task2.order;
        })
        .map((task, index) => {
            task.order = index;
            return task;
        });
};

function replaceTaskInList(taskId, newTask, list) {
    // exclude old value
    const result = list.filter(task => task.id !== taskId);

    if (newTask) {
        // push new value
        result.push(newTask);
    }

    return result;
}

function replaceTaskInMapById(taskId, newTask, map) {
    // exclude old value
    const result = Object
        .keys(map)
        .filter(t => t !== taskId)
        .reduce((result, id) => {
            result[id] = map[id];
            return result;
        }, { });

    if (newTask) {
        result[taskId] = newTask;
    }

    return result;
}

function replaceTaskInGroup(taskId, newTask, taskGroupId, mapTaskGroupById) {
    const newMap = Object
        .keys(mapTaskGroupById)
        .filter(taskGroup => taskGroup.id !== taskGroupId);
    
    let newTaskGroup = (mapTaskGroupById[taskGroupId] || []).filter(task => task.id !== taskId);

    if (newTask) {
        newTaskGroup.push(newTask);
    }

    newMap[taskGroupId] = updateOrders(newTaskGroup);

    return newMap;
}