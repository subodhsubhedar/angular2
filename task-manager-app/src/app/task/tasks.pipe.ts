import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task';
import { ParentTask } from '../parent-task/parent-task';

@Pipe({
  name: 'tasksSearchFilter'
})
export class TasksFilterPipe implements PipeTransform {

  transform(items: Array<Task>, searchTaskDesc: string, searchParentTask: number, searchStartDate: Date, searchEndDate: Date, searchPriorityFrom: number, searchPriorityTo: number): Array<Task> {
    //  console.log('Pipe search starts:' + searchTaskDesc);
    console.log('Pipe search starts searchStartDate:' + searchStartDate);
    // console.log('Pipe search starts:' + searchStartDate);
    //console.log('Pipe search starts:' + searchEndDate);
    //console.log('Pipe search starts:' + searchPriorityFrom);
    //console.log('Pipe search starts:' + searchPriorityTo);

    if (items && items.length) {

      return items.filter((task: Task) => {

        if (searchTaskDesc && (task.taskDesc.toLowerCase().indexOf(searchTaskDesc) == -1)) {
          return false;
        }
        console.log('Pipe search starts loop :' + task.startDate);
        if (searchParentTask && (
          (task.parentTask == undefined || task.parentTask == null) ||
          (task.parentTask != undefined && (task.parentTask.parentTaskId != searchParentTask)))
        ) {
          return false;
        }
        if (searchStartDate && (task.startDate < searchStartDate)) {
          return false;
        }
        if (searchEndDate && (task.endDate > searchEndDate)) {
          return false;
        }
        if (searchPriorityFrom && ((task.priority < searchPriorityFrom))) {
          return false;
        }
        if (searchPriorityTo && ((task.priority > searchPriorityTo))) {
          return false;
        }
        return true;
      })
    } else {
      return items;
    }
  }

}