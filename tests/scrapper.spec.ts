import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { PendingTimesheetComponent } from '../pages/pending-timesheet-component';
import { WorkListPage } from '../pages/work-list-page';
import { TimesheetPage } from '../pages/timesheet-page';
import { TimeEntry } from '../utils/time-entry';
import { writeExcelFile } from '../utils/excel-file-writer';
import { TaskDetails } from '../utils/task-details';

test('API scraping', async ({ page }) => {
  const username: string = 'joseph.mathew';
  const password: string = '1234@Banjo';
  const fromWeekStartDate: string = '30-Mar-2026';

  let loginPage: LoginPage = new LoginPage(page);
  await loginPage.goToLoginPage();
  await loginPage.enterUsername(username);
  await loginPage.enterPassword(password);
  await loginPage.clickSignInButton();

  let pendingTimesheetComponent: PendingTimesheetComponent = new PendingTimesheetComponent(page);
  await pendingTimesheetComponent.clickCloseButton();

  let workListPage: WorkListPage = new WorkListPage(page);
  let responsePromise = page.waitForResponse('**/timesheet.do*');
  await workListPage.clickTimesheetButton();
  let response = await responsePromise;
  let responseText: string = await response.text();
  let responseJson = await response.json();
  let startOfWeek: string = responseJson.timesheetData.startDayOfWeek;
  writePlainTextFile('response_storage/' + startOfWeek + '.json', responseText);

  do {
    responsePromise = page.waitForResponse('**/timesheet.do*');
    let timesheetPage = new TimesheetPage(page);
    await timesheetPage.clickPreviousWeekButton();
    response = await responsePromise;
    responseText= await response.text();
    responseJson = await response.json();
    startOfWeek = responseJson.timesheetData.startDayOfWeek;
    writePlainTextFile('response_storage/' + startOfWeek + '.json', responseText);
  } while (startOfWeek !== fromWeekStartDate);

});

test('API parsing', async ({ page }) => {
  let timeEntryData: TimeEntry[] = [];
  let taskDetailsData: TaskDetails[] = [];

  const fs = require('fs');
  const assets_folder = 'response_storage/';
  fs.readdirSync(assets_folder).forEach((file) => {
    try {
      const data = fs.readFileSync(assets_folder + file, 'utf8');
      const jsonData = JSON.parse(data);
      jsonData.timesheetData.timesheetApprovalData.userDataJsonObject[0].timesheetMasterJsonArray.forEach((task: any) => {
        //console.log(task.ACT_TS_NAME);
        if (!taskDetailsData.some(taskDetails => taskDetails.taskName === task.ACT_TS_NAME)) {
          taskDetailsData.push(new TaskDetails(task.rootObjectName, task.parentname, task.ACT_TS_NAME, task.scheduleStartDate, task.scheduleEndtDate, task.plannedSchHours, task.ActualHours));
        }
        task.timesheetDetails.forEach((timesheetDetail: any) => {
          if (timesheetDetail.stHrMinJson.displayHrMinStr !== '0:0' && timesheetDetail.stHrMinJson.displayHrMinStr !== '') {
            //console.log(timesheetDetail.absoluteDateString + ' - ' + timesheetDetail.stHrMinJson.displayHrMinStr);
            timeEntryData.push(new TimeEntry(timesheetDetail.absoluteDateString, task.rootObjectName, task.parentname, task.ACT_TS_NAME, timesheetDetail.stHrMinJson.hrValue, timesheetDetail.stHrMinJson.minValue));
          }
        });
      })
    } catch (error) {
      console.error('Error reading JSON file:', error);
    }
  });

  await writeExcelFile('Parsed Data', timeEntryData.map(entry => [entry.project, entry.parent, entry.taskName, entry.date, entry.time]), taskDetailsData.map(entry => [entry.project, entry.parent, entry.taskName, entry.scheduledStartDate, entry.scheduledEndDate, entry.plannedHours, entry.actualHours]));
});