import React from 'react'

import HomepageChartA from './HomepageChartA'
import HomepageChartB from './HomepageChartB'

import './HomepageCharts.scss'

import StopRoundedIcon from '@material-ui/icons/StopRounded';


function HomepageCharts({ projectsManaging, projectsWorkingOn, taskStatuses, tasks }) {

  return (
      <div className='homepage-charts'>
        <HomepageChartA chartInformation={ projectsManaging } chartTitle='Projects Managing:' chartColor='#3d6bb3'  className='canvas-container-chartA'/>
        <HomepageChartA chartInformation={ projectsWorkingOn } chartTitle='Projects Working On:' chartColor='#3d6bb3' />
        {tasks[0] && 
        <div className='homepage-chart-B-legend'>
          <HomepageChartB chartInformation={ taskStatuses } />
          <ul>
            {taskStatuses.late > 0 && 
            <div>
              <StopRoundedIcon className='homepage-chart-legend-late' />
              <p>Late</p>
            </div>
            }
            {taskStatuses.toDo > 0 && 
            <div>
              <StopRoundedIcon className='homepage-chart-legend-to-do' />
              <p>To-Do</p>
            </div>
            }
            {taskStatuses.inProgress > 0 && 
            <div>
              <StopRoundedIcon className='homepage-chart-legend-in-progress' />
              <p>In Progress</p>
            </div>
            }
            {taskStatuses.done > 0 && 
            <div>
              <StopRoundedIcon className='homepage-chart-legend-done' />
              <p>Done</p>
            </div>
            }
          </ul>
        </div>}
        {!tasks[0] && 
        <HomepageChartA chartInformation={0} chartTitle='Task Tracker' chartColor='#4d9900' />
        }
      </div>
  )
}

export default HomepageCharts
