# _data files

## meetings.yml

Controls exceptions to the default weekly schedule (every Saturday at 09:30).
Only dates that differ from normal need an entry — no entry means a normal session.

```yaml
exceptions:
  - date: 2026-12-27        # ISO date, unquoted is fine here
    closed: true            # cancels the session
    message: WE ARE CLOSED FOR CHRISTMAS.  # optional; default: "NO MEETING THIS WEEKEND!"

  - date: 2026-06-14
    time: "10:00"           # time change only (no closed: key)
```

This data is read by `assets/js/next-meeting.js` to populate the header badge.

---

## schedule.yml

Upcoming session entries used by `schedule.html`. One entry per Saturday.
Dates must be **quoted strings** (`"2026-06-21"`) — unquoted YAML dates are parsed
as Ruby Date objects, which breaks the Liquid string comparison used to filter
past sessions.

```yaml
sessions:
  - date: "2026-06-21"
    status: confirmed       # confirmed | tentative | cancelled | closed
    supervisors:            # users who have agreed to supervise
      - user1
      - user3
    available:              # users available to supervise but slots already filled
      - user2
    unavailable:            # users who have explicitly said they can't make it
      - user4
                            # omit the value (null) rather than [] when a list is empty
```

**Status values:**
- `confirmed` — at least `min_supervisors` supervisors are in place (green)
- `tentative` — session likely to run but not fully staffed (orange)
- `cancelled` — a specific session has been called off (red)
- `closed` — planned closure, e.g. Christmas break (grey)

`cancelled` and `closed` sessions hide the supervisors/available/unavailable section
and suppress the "Needs supervisors" warning. The distinction is tone: `cancelled`
implies a session that was expected to run but won't; `closed` implies a planned break.

`min_supervisors` (currently 2) is set in `_config.yml`.

User IDs (e.g. `user1`) are resolved to names via `usernames.yml`.

The server app's logic when a user submits their availability:
1. If `supervisors` list is shorter than `min_supervisors`, add them to `supervisors`
   and promote status to `confirmed` if the list is now full.
2. Otherwise add them to `available`.

---

## usernames.yml

Maps internal user IDs to display names. IDs are stable keys used in `schedule.yml`;
display names can be updated here without touching the schedule data.

```yaml
users:
  user1:
    name: Jon
```

> **Note:** email addresses must **never** be stored here or anywhere in the repository.
> Emails live only in the local server config on the home server, outside any git repo.
