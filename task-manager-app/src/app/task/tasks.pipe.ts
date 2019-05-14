import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task';
import { ParentTask } from '../parent-task/parent-task';

@Pipe({
  name: 'tasksSearchFilter'
})
export class TasksFilterPipe implements PipeTransform {

  transform(items: Array<Task>, searchTaskDesc: string, searchParentTask: number, searchStartDate: Date, searchEndDate: Date, searchPriorityFrom: number, searchPriorityTo: number): Array<Task> {

    if (items && items.length) {

      return items.filter((task: Task) => {

        if (searchTaskDesc && (task.task.toLowerCase().indexOf(searchTaskDesc) == -1)) {
          return false;
        }

        if (searchParentTask && (
          (task.parentTask == undefined || task.parentTask == null) ||
          (task.parentTask != undefined && (task.parentTask.parentId != searchParentTask)))
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