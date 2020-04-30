import tasksData from './tasksData.json';

export default loadState = () => ({
    days: tasksData.days,
    taskGroups: tasksData.taskGroups,
    tasks: tasksData.tasks,
    taskStatuses: { }
});