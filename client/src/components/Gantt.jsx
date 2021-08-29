import React from 'react';
import {FrappeGantt, Task, ViewMode} from 'frappe-gantt-react';

/* 
Tasks need to be fed to FrappeGant as the default 'Task' class extracted at the top of this file.
The tasks mapped to the new Task class have to be in an object formation with keys:
  { id, name, start, end, progress, dependencies }
Since our task data is much more robust:
  { id, title, task_description, priority_id, status_id, project_id, plan_start, plan_end, proj_name, priority_name, status, task_users}
We do 2 maps, first one is to convert our structure into the required structure. Second is to convert that into an array of 'Task' classes as required by the library.
*/

function Gantt({projectTasks}) {

  const tasks = projectTasks[0] && 
  projectTasks.map(el => {
    return {
      id: el.id,
      name: el.title,
      start: el.plan_start,
      end: el.plan_end,
      progress: 100,
      dependencies: ''
    }
  })
  .map(x => new Task(x));

  return (
    <>
      {!projectTasks[0] ? <h1>Ha-ha no data for a Gantt!</h1> :
      <FrappeGantt
        tasks={tasks}
        viewMode={ViewMode.Week}
        onClick={(task) => console.log(task)}
        onDateChange={(task, start, end) => console.log(task, start, end)}
        onProgressChange={(task, progress) => console.log(task, progress)}
        onTasksChange={(tasks) => console.log(tasks)}
        // // https://github.com/mohammed-io/frappe-gantt-react/blob/master/src/App.tsx
        // // onViewChange={this._func} --> something to do with class state = {mode: ViewMode.___} 
      />}
    </>
  )
}

export default Gantt;
