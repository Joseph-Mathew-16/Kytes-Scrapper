import { Workbook, Worksheet } from 'exceljs';

export async function writeExcelFile(filePath: string, timeEntryData: any[][], taskDetailsData: any[][]) {
    const workbook = new Workbook();

    const timeEntryWorksheet = workbook.addWorksheet('Time Entry');
    timeEntryWorksheet.addRow(['Project', 'Parent/Phase', 'Task Name', 'Date', 'Time']);
    timeEntryWorksheet.getColumn(4).numFmt = 'dd-mmm-yyyy';
    timeEntryWorksheet.addRows(timeEntryData);

    const taskDetailsWorksheet = workbook.addWorksheet('Task Details');
    taskDetailsWorksheet.addRow(['Project', 'Parent/Phase', 'Task Name', 'Scheduled Start Date', 'Scheduled End Date', 'Planned Hours', 'Actual Hours']);
    taskDetailsWorksheet.getColumn(4).numFmt = 'dd-mmm-yyyy';
    taskDetailsWorksheet.getColumn(5).numFmt = 'dd-mmm-yyyy';
    taskDetailsWorksheet.addRows(taskDetailsData);

    const target = filePath.endsWith('.xlsx') ? filePath : `${filePath}.xlsx`;
    await workbook.xlsx.writeFile(target);
}