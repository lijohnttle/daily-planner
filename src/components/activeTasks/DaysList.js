import React from 'react';
import { useSelector } from 'react-redux';
import { Day } from './Day';

export const DaysList = () => {
    const { days, taskGroupsByDayId } = useSelector(state => ({
        days: state.days.list,
        taskGroupsByDayId: state.taskGroups.mapByDayId,
    }));

    return (
        <>
            {days.map(day => {
                const taskGroups = taskGroupsByDayId[day.id];

                return <Day key={day.id} day={day} taskGroups={taskGroups} />;
            })}
        </>
    );
}