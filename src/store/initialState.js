import tasksData from './tasksData.json';

export default loadState = () => ({
    tasks: tasksData.tasks,
    taskGroups: tasksData.taskGroups
});