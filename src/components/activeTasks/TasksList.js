import React from 'react';
import { Task } from './Task';

export const TasksList = ({ tasks }) => {
    return (
        <>
            {tasks && tasks.length > 0
                ? tasks.map(task => <Task key={task.id} task={task} withinActiveGroup={true} />)
                : null}
        </>
    );
};