const convertToDisplayDataGroupedByDays = (days, taskGroups, tasks) => {
    const displayDays =  days.map(item => ({
        ...item,
        taskGroups: []
    }));
    const displayTaskGroups = taskGroups.map(item => ({
        ...item,
        tasks: []
    }));

    const displayDayByIdMap = mapById(displayDays);
    const displayTaskGroupByIdMap = mapById(displayTaskGroups);

    fillDaysWithTaskGroups(displayTaskGroups, displayDayByIdMap);
    fillTaskGroupsWithTasks(tasks, displayTaskGroupByIdMap);

    return {
        days: displayDays
    };
}


const mapById = list => {
    return list.reduce((result, item) => {
        result[item.id] = item;
        return result;
    }, { });
};

const fillDaysWithTaskGroups = (taskGroups, dayByIdMap) => {
    taskGroups.forEach(taskGroup => {
        const day = dayByIdMap[taskGroup.dayId];

        if (day) {
            day.taskGroups.push(taskGroup);
        }
    });
};

const fillTaskGroupsWithTasks = (tasks, taskGroupByIdMap) => {
    tasks.forEach(task => {
        const group = taskGroupByIdMap[task.groupId];

        if (group) {
            group.tasks.push(task);
        }
    });
};

export { convertToDisplayDataGroupedByDays };