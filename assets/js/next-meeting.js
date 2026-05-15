(function () {
  var output = document.getElementById('next-meeting-message');
  var datesNode = document.getElementById('meeting-dates');

  if (!output || !datesNode) {
    return;
  }

  var meetingDates;
  try {
    meetingDates = JSON.parse(datesNode.textContent || '[]');
  } catch (_error) {
    output.textContent = 'Upcoming meeting dates are currently unavailable.';
    return;
  }

  var today = new Date();
  today.setHours(0, 0, 0, 0);

  var nextMeeting = null;
  for (var i = 0; i < meetingDates.length; i++) {
    var candidate = new Date(meetingDates[i] + 'T12:00:00');
    if (!Number.isNaN(candidate.getTime()) && candidate >= today) {
      nextMeeting = candidate;
      break;
    }
  }

  if (!nextMeeting) {
    output.textContent = 'No upcoming meeting dates are published yet.';
    return;
  }

  var oneDayMs = 24 * 60 * 60 * 1000;
  var differenceInDays = Math.round((nextMeeting - today) / oneDayMs);

  var day = nextMeeting.getDate();
  var suffix = 'th';
  if (day % 10 === 1 && day % 100 !== 11) suffix = 'st';
  if (day % 10 === 2 && day % 100 !== 12) suffix = 'nd';
  if (day % 10 === 3 && day % 100 !== 13) suffix = 'rd';

  var weekday = nextMeeting.toLocaleDateString('en-GB', { weekday: 'long' });
  var month = nextMeeting.toLocaleDateString('en-GB', { month: 'long' });
  var formattedDate = weekday + ' ' + day + suffix + ' ' + month;

  var whenText = 'in ' + differenceInDays + ' days';
  if (differenceInDays === 0) whenText = 'today';
  if (differenceInDays === 1) whenText = 'tomorrow';

  output.textContent = 'Our next meeting is ' + whenText + ': ' + formattedDate + '.';
})();
