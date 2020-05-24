import * as tasksDuck from '../../src/ducks/tasks';

describe('Given there is no previous state', () => {
    describe('When reducer has been called without state parameter', () => {
        it('Then the new state should include lists and maps', () => {
            const initialState = tasksDuck.reducer(undefined, { type: '' });
    
            expect(initialState.list).not.toBeUndefined();
            expect(initialState.mapById).not.toBeUndefined();
            expect(initialState.mapByGroupId).not.toBeUndefined();
        });
    });

    describe('When a user adds a new task', () => {
        const taskGroupIdNew = 7;
        const initialState = { };

        it('Then the task should be added to the state.list', () => {
            const state = tasksDuck.reducer(initialState, tasksDuck.addTask(taskGroupIdNew));
    
            expect(state.list.length).toBe(1);
        });
    
        it('Then the task should be added to the state.mapById', () => {
            const state = tasksDuck.reducer(initialState, tasksDuck.addTask(taskGroupIdNew));
            const task = state.list[0];

            expect(Object.keys(state.mapById).length).toBe(1);
            expect(state.mapById[task.id]).toBe(task);
        });
    
        it('Then a new group should be added to the new state.mapByGroupId', () => {
            const state = tasksDuck.reducer(initialState, tasksDuck.addTask(taskGroupIdNew));
    
            expect(Object.keys(state.mapByGroupId).length).toBe(1);
        });
    
        it('Then the task should be added to the new group', () => {
            const state = tasksDuck.reducer(initialState, tasksDuck.addTask(taskGroupIdNew));
            const group = state.mapByGroupId[taskGroupIdNew];
            const task = state.list[0];
    
            expect(group.length).toBe(1);
            expect(group[0]).toBe(task);
        });
    
        it('Then the task should be assigned with initial values', () => {
            const state = tasksDuck.reducer(initialState, tasksDuck.addTask(taskGroupIdNew));
            const task = state.list[0];
    
            expect(task.id).toBe(0);
            expect(task.name).toBe('New Task');
            expect(task.duration).toBeNull();
            expect(task.priority).toBe('high');
            expect(task.groupId).toBe(taskGroupIdNew);
            expect(task.order).toBe(0);
        });
    });
});

describe('Given there is a previous state with multiple tasks in different groups', () => {
    const taskGroupId1 = 0;
    const taskGroupId2 = 1;
    const taskGroupIdNew = 2;
    let task1_1;
    let task1_2;
    let task2_1;
    let task2_2;
    let initialState;

    beforeEach(() => {
        task1_1 = {
            id: 0,
            name: 'Task 1 from Group 1',
            duration: null,
            priority: 'high',
            groupId: taskGroupId1,
            order: 0,
        };

        task1_2 = {
            id: 1,
            name: 'Task 2 from Group 1',
            duration: null,
            priority: 'high',
            groupId: taskGroupId1,
            order: 1,
        };

        task2_1 = {
            id: 3,
            name: 'Task 1 from Group 2',
            duration: null,
            priority: 'high',
            groupId: taskGroupId2,
            order: 0,
        };

        task2_2 = {
            id: 4,
            name: 'Task 2 from Group 2',
            duration: null,
            priority: 'high',
            groupId: taskGroupId2,
            order: 1,
        };

        initialState = {
            list: [task1_1, task1_2, task2_1, task2_2],
            mapById: {
                [task1_1.id]: task1_1,
                [task1_2.id]: task1_2,
                [task2_1.id]: task2_1,
                [task2_2.id]: task2_2,
            },
            mapByGroupId: {
                [taskGroupId1]: [task1_1, task1_2],
                [taskGroupId2]: [task2_1, task2_2],
            }
        };
    });

    describe('When a user adds a new task to a new group', () => {
        it('Then the task should be added to the state.list', () => {
            const state = tasksDuck.reducer(initialState, tasksDuck.addTask(taskGroupIdNew));
    
            expect(state.list.length).toBe(initialState.list.length + 1);
        });

        it('Then the task should be added to the state.mapById', () => {
            const state = tasksDuck.reducer(initialState, tasksDuck.addTask(taskGroupIdNew));
            const task = findNewTask(state, initialState);
    
            expect(Object.keys(state.mapById).length).toBe(initialState.list.length + 1);
            expect(state.mapById[task.id]).toBe(task);
        });

        it('Then a new group should be added to the new state.mapByGroupId', () => {
            const state = tasksDuck.reducer(initialState, tasksDuck.addTask(taskGroupIdNew));
    
            expect(Object.keys(state.mapByGroupId).length).toBe(Object.keys(initialState.mapByGroupId).length + 1);
        });

        it('Then the task should be added to the new group', () => {
            const state = tasksDuck.reducer(initialState, tasksDuck.addTask(taskGroupIdNew));
            const group = state.mapByGroupId[taskGroupIdNew];
            const task = findNewTask(state, initialState);
    
            expect(group.length).toBe(1);
            expect(group[0]).toBe(task);
        });
    });

    describe('When a user adds a new task to a group with other tasks', () => {
        it('Then the task should be added to the state.list', () => {
            const state = tasksDuck.reducer(initialState, tasksDuck.addTask(taskGroupId1));
    
            expect(state.list.length).toBe(initialState.list.length + 1);
        });

        it('Then the task should be added to the state.mapById', () => {
            const state = tasksDuck.reducer(initialState, tasksDuck.addTask(taskGroupId1));
            const task = findNewTask(state, initialState);
    
            expect(Object.keys(state.mapById).length).toBe(initialState.list.length + 1);
            expect(state.mapById[task.id]).toBe(task);
        });

        it('Then the task should be added to the group', () => {
            const state = tasksDuck.reducer(initialState, tasksDuck.addTask(taskGroupId1));
            const group = state.mapByGroupId[taskGroupId1];
            const initialGroup = initialState.mapByGroupId[taskGroupId1];
            const task = findNewTask(state, initialState);
    
            expect(group.length).toBe(initialGroup.length + 1);
            expect(findNewTaskInGroup(group, initialGroup)).toBe(task);
            expect(task.order).toBe(group.length - 1);
        });
    });
});

function findNewTask(state, initialState) {
    return state.list.find(task => initialState.list.every(task2 => task2.id !== task.id));
}

function findNewTaskInGroup(group, initialGroup) {
    return group.find(task => initialGroup.every(task2 => task2.id !== task.id));
}