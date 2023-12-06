function blockCalendarSchedules() {
  // Set the ID of the spreadsheet and calendar
  var spreadsheetId = '1jLs8_hZuwIBHwY2wDVD6yH7rlSNHK3QhNFp5VemdZ-o';
  var calendarId = 'bishal.samanta@masaischool.com';

  // Open the spreadsheet and get the data from the sheet
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var sheet = spreadsheet.getSheetByName('Sheet1'); // Replace with your sheet name
  var data = sheet.getDataRange().getValues();

  console.log(data);

  // // Access the calendar
  var calendar = CalendarApp.getCalendarById(calendarId);

  // // Loop through the data and block calendar schedules
  for (var i = 1; i < data.length; i++) {
    var scheduleDate = new Date(data[i][0]); 
    var schedularEmailId = data[i][1];   
    var classTopic = data[i][2];          
    var calanderZoomLink = data[i][3];
    var guestEmail = data[i][4];
    var scheduleStartTime = new Date(data[i][5]);
    var scheduleEndTime = new Date(data[i][6]);


     // Combine date and time for start and end
    var eventStartTime = new Date(
      scheduleDate.getFullYear(),
      scheduleDate.getMonth(),
      scheduleDate.getDate(),
      scheduleStartTime.getHours(),
      scheduleStartTime.getMinutes()
    );

    var eventEndTime = new Date(
      scheduleDate.getFullYear(),
      scheduleDate.getMonth(),
      scheduleDate.getDate(),
      scheduleEndTime.getHours(),
      scheduleEndTime.getMinutes()
    );

    // Create the event with both scheduler and guest emails
    var event = calendar.createEvent(classTopic, eventStartTime, eventEndTime, {
      description: 'Zoom Link: ' + calanderZoomLink,
      guests: schedularEmailId + ',' + guestEmail // Use an array to include multiple guests
    });

    Logger.log('Event created: ' + classTopic);


  }
}