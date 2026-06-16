(function () {
  var badge = document.getElementById('next-meeting-badge');
  var sessionsEl = document.getElementById('schedule-sessions');

  if (!badge) return;

  var DEFAULT_TIME = (sessionsEl && sessionsEl.getAttribute('data-default-time')) || '09:30';

  var sessions = {};
  if (sessionsEl) {
    try {
      var arr = JSON.parse(sessionsEl.textContent || 'null') || [];
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] && arr[i].date) sessions[arr[i].date] = arr[i];
      }
    } catch (_e) {}
  }

  function isClosed(session) {
    return session && (session.status === 'closed' || session.status === 'cancelled');
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
  var thisSession = sessions[thisKey];

  var message;

  function html(label, date) {
    return '<span class="badge-label">' + label + '</span>'
         + '<span class="badge-date">' + date + '</span>';
  }

  if (isClosed(thisSession)) {
    // Find the next non-closed Saturday
    var search = new Date(nextSat);
    var nextGoodSat = null;
    var nextTime = DEFAULT_TIME;
    for (var j = 0; j < 52; j++) {
      search.setDate(search.getDate() + 7);
      var key = dateKey(search);
      var s = sessions[key];
      if (!isClosed(s)) {
        nextGoodSat = new Date(search);
        nextTime = (s && s.time) ? s.time : DEFAULT_TIME;
        break;
      }
    }
    var closedMsg = (thisSession.message) ? thisSession.message : 'NO MEETING THIS WEEKEND!';
    badge.setAttribute('data-cancelled', 'true');
    if (nextGoodSat) {
      message = html(closedMsg, 'Our next meeting is<br>' + formatSaturday(nextGoodSat) + ' @ ' + nextTime);
    } else {
      message = html(closedMsg, '');
    }
  } else if (thisSession && thisSession.time) {
    message = html('Next Meeting', relPrefix + formatSaturday(nextSat) + ' @ ' + thisSession.time);
  } else {
    message = html('Next Meeting', relPrefix + formatSaturday(nextSat) + ' @ ' + DEFAULT_TIME);
  }

  badge.innerHTML = message;
})();
