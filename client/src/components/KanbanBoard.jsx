import React from 'react';

import { IconButton } from '@material-ui/core';

import AddCircleIcon from '@material-ui/icons/AddCircle';

import './KanbanBoard.scss';
import KanbanTask from './KanbanTask';

const backgroundColor = {
  Late: 'rgb(213, 60, 60)',
  'To-Do': 'rgb(137, 118, 185)',
  'In Progress': 'rgb(251, 175, 60)',
  Done: 'rgb(106, 168, 79)'
};

function KanbanBoard({ status, tasks }) {
  return (
    <div className="kanban-board" style={{ backgroundColor: backgroundColor[status] }}>
      <header className="kanban-board-header">
        <h2>
          {status.toUpperCase()} ({tasks.length})
        </h2>
      </header>

      <div className="kanban-board-body">
        <div className="kanban-board-body-div">
          {tasks.map((task) => (
            <KanbanTask task={task} />
          ))}
        </div>
      </div>

      <footer className="kanban-board-footer">
        <div className="kanban-board-footer-div">
          <IconButton size="small">
            <AddCircleIcon />
          </IconButton>
          <p>Add new task</p>
        </div>
      </footer>
    </div>
  );
}

export default KanbanBoard;
