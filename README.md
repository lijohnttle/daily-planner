# daily-planner

## Features

- [ ] To add schedule for every day of the week.
- [ ] To configure an **interval** within a day schedule (for example, define an interval from 6 AM to 8AM).
- [ ] To configure a list of **tasks** within an interval.
- [ ] Each task contains next parameters:
  - *Name* - the name of the task.
  - *Duration* - the time that should be spent on the task.
  - *Priority* - the priority of the task. Possible values: *High*, *Optional*.
- [ ] To suspend all notifications: **indefinitely**, **for today**, **next hour**


## Active Tasks

![Image of Tasks Screen](/design/mockups/TasksScreen.png)

All active and near future tasks are displayed on the **active tasks** screen.

A task has next statuses:
- PENDING - the task is waiting for its execution;
- ACTIVE - the task in progress;
- DONE - the task is done.

When user clicks on a task, a menu shows up. It could include next options:
- COMPLETE - marks the selected task as completed. It is purely for tracking progress within an interval. As soon as the interval is been passed, all tasks within it become marked as complete. Available only within active interval.
- RESET - resets status of the selected task to unstarted. Available only within active interval.
- START - marks the selected task as started. Available only within active interval.


## Menu

![Image of Menu](/design/mockups/Menu.png)


## Schedule Builder

![Image of ScheduleBuilder - Days Screen](/design/mockups/ScheduleBuilder_Days.png)

![Image of ScheduleBuilder - Intervals Screen](/design/mockups/ScheduleBuilder_Intervals.png)

![Image of ScheduleBuilder - Tasks Screen](/design/mockups/ScheduleBuilder_Tasks.png)

