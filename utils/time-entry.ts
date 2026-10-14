export class TimeEntry {
    readonly project: string;
    readonly parent: string;
    readonly taskName: string;
    readonly date: Date;
    readonly time: number;

    constructor(date: string, project: string, parent: string, taskName: string, hour: number, minute: number) {

        this.date = new Date(date);
        this.date.setDate(this.date.getDate() + 1);
        this.project = project;
        this.parent = parent;
        this.taskName = taskName;
        this.time = hour + (minute / 60);
    }
}