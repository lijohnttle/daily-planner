import React from 'react';
import { useSelector } from 'react-redux';
import { TaskGroup } from './TaskGroup';

export const TaskGroupsList = ({ taskGroups }) => {
    const { taskByGroupId } = useSelector(state => ({
        taskByGroupId: state.tasks.mapByGroupId,
    }));
    
    return (
        <>
            {taskGroups && taskGroups.length > 0 ? taskGroups.map(taskGroup => {
                const tasks = taskByGroupId[taskGroup.id];

                if (tasks) {
                    return <TaskGroup key={taskGroup.id} taskGroup={taskGroup} tasks={tasks} />;
                }

                return null;
            }) : null}
        </>
    );
};