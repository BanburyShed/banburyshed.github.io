---
layout: default
title: About
---

<section aria-labelledby="next-meeting-heading">
  <h2 id="next-meeting-heading">Next meeting</h2>
  <p id="next-meeting-message">Loading next meeting date...</p>
</section>

<section aria-labelledby="about-heading">
  <h2 id="about-heading">About Banbury Shed</h2>
  <p>
    Banbury Shed is a welcoming community workshop where people can share practical skills,
    collaborate on projects, and enjoy good company.
  </p>
</section>

<section aria-labelledby="find-us-heading">
  <h2 id="find-us-heading">How to find us</h2>
  <p>Banbury Shed, Unit 4, Tramway Industrial Estate, Banbury, OX16 5TH.</p>
  <p>We are near Banbury railway station and there is nearby parking on Tramway Road.</p>
</section>

<script id="meeting-dates" type="application/json">[
{% for meeting in site.data.meetings.dates %}
  "{{ meeting }}"{% unless forloop.last %},{% endunless %}
{% endfor %}
]</script>
<script src="/assets/js/next-meeting.js"></script>
