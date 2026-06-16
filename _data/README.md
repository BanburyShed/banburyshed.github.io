# _data files

## schedule.yml

Upcoming session entries used by both `schedule.html` and the header meeting badge
(`assets/js/next-meeting.js`). One entry per Saturday.

Dates must be **quoted strings** (`"2026-06-21"`) — unquoted YAML dates are parsed
as Ruby Date objects, which breaks the Liquid string comparison used to filter
past sessions.

```yaml
sessions:
  - date: "2026-06-21"
    status: confirmed       # confirmed | tentative | cancelled | closed
    time: "10:00"           # optional — overrides the default 09:30 start time
    message: CLOSED TODAY.  # optional — custom badge message when status is closed/cancelled
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

The badge JS treats any Saturday with no entry as a normal session at `DEFAULT_TIME`
(09:30). Saturdays beyond the end of `schedule.yml` are always treated as normal.

`min_supervisors` (currently 2) is set in `_config.yml`.

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
