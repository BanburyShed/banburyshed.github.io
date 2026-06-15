(function () {
  var badge = document.getElementById('next-meeting-badge');
  var exceptionsEl = document.getElementById('meeting-exceptions');

  if (!badge) return;

  var DEFAULT_TIME = '09:30';

  var exceptions = {};
  if (exceptionsEl) {
    try {
      var arr = JSON.parse(exceptionsEl.textContent || 'null') || [];
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] && arr[i].date) exceptions[arr[i].date] = arr[i];
      }
    } catch (_e) {}
  }

  function ordinal(n) {
    if (n > 3 && n < 21) return 'th';
    switch (n % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  function formatSaturday(d) {
    var n = d.getDate();
    var month = d.toLocaleDateString('en-GB', { month: 'long' });
    return 'Saturday ' + n + ordinal(n) + ' ' + month;
  }

  function dateKey(d) {
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  }

  var today = new Date();
  today.setHours(0, 0, 0, 0);

  // Next Saturday (0 = today if today is Saturday)
  var daysUntilSat = (6 - today.getDay() + 7) % 7;
  var nextSat = new Date(today);
  nextSat.setDate(today.getDate() + daysUntilSat);

  var daysAway = Math.round((nextSat - today) / 86400000);
  var relPrefix = daysAway === 0 ? 'today, ' : daysAway === 1 ? 'tomorrow, ' : '';

  var thisKey = dateKey(nextSat);
  var thisEx = exceptions[thisKey];

  var message;

  if (thisEx && (thisEx.cancelled || thisEx.closed)) {
    // Find the next non-closed Saturday
    var search = new Date(nextSat);
    var nextGoodSat = null;
    var nextTime = DEFAULT_TIME;
    for (var j = 0; j < 52; j++) {
      search.setDate(search.getDate() + 7);
      var key = dateKey(search);
      var ex = exceptions[key];
      if (!ex || (!ex.cancelled && !ex.closed)) {
        nextGoodSat = new Date(search);
        nextTime = (ex && ex.time) ? ex.time : DEFAULT_TIME;
        break;
      }
    }
    var closedMsg = (thisEx.message) ? thisEx.message : 'NO MEETING THIS WEEKEND!';
    badge.setAttribute('data-cancelled', 'true');
    if (nextGoodSat) {
      message = closedMsg + ' Our next meeting is ' + formatSaturday(nextGoodSat) + ' @ ' + nextTime;
    } else {
      message = closedMsg;
    }
  } else if (thisEx && thisEx.time) {
    var time = thisEx.time;
    var laterOrEarlier = time > DEFAULT_TIME ? 'later' : 'earlier';
    message = 'Next Meeting: we are opening ' + laterOrEarlier + ' than usual ' + relPrefix + formatSaturday(nextSat) + ' @ ' + time;
  } else {
    message = 'Next Meeting: ' + relPrefix + formatSaturday(nextSat) + ' @ ' + DEFAULT_TIME;
  }

  badge.textContent = message;
})();
