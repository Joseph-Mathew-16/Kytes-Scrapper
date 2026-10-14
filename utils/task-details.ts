export class TaskDetails {
    readonly project: string;
    readonly parent: string;
    readonly taskName: string;
    readonly scheduledStartDate: Date;
    readonly scheduledEndDate: Date;
    readonly plannedHours: number;
    readonly actualHours: number;

    constructor(project: string, parent: string, taskName: string, scheduledStartDate: string, scheduledEndDate: string, plannedTime: string, actualHours: number) {
        this.project = project;
        this.parent = parent;
        this.taskName = taskName;
        let plannedHoursOnly = Number.parseInt(plannedTime.split(':')[0]);
        let plannedMinutesOnly = Number.parseInt(plannedTime.split(':')[1]);
        this.scheduledStartDate = new Date(scheduledStartDate);
        this.scheduledStartDate.setDate(this.scheduledStartDate.getDate() + 1);
        this.scheduledEndDate = new Date(scheduledEndDate);
        this.scheduledEndDate.setDate(this.scheduledEndDate.getDate() + 1);
        this.plannedHours = plannedHoursOnly + (plannedMinutesOnly / 60);
        this.actualHours = actualHours / 60;
    }
}