---
layout: default
title: Banbury Shed & RVS Community
---

<img src="{{ '/assets/images/banbury_shed_cropped.jpg' | relative_url }}" alt="Banbury Shed" class="shed-hero">

<section aria-labelledby="about-heading">
  <h2 id="about-heading">About Banbury Shed</h2>
  <p>
    Banbury Shed is a welcoming community workshop where people can share practical skills,
    collaborate on projects, and enjoy good company. We meet every Saturday morning at 09:30 —
    new members are always welcome, just turn up!
  </p>
  <p><a href="/about/">More about us &rarr;</a></p>
</section>

<section aria-labelledby="news-heading">
  <h2 id="news-heading">Latest news</h2>
  {% for post in site.posts limit:3 %}
  <article>
    <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
    <p><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%d %B %Y" }}</time></p>
    {{ post.excerpt }}
  </article>
  {% endfor %}
  <p><a href="/news/">All news &rarr;</a></p>
</section>

<section aria-labelledby="find-us-heading">
  <h2 id="find-us-heading">How to find us</h2>
  <p>Banbury Shed, People's Park, Banbury, OX16 2AB.</p>
  <p>We are just through the black gates in People's Park, close to the Warwick Road entrance.</p>
  <p>What 3 Words: <a href="https://w3w.co/cried.judges.earth" target="_blank" rel="noopener">///cried.judges.earth</a></p>
</section>

<section aria-labelledby="contact-heading">
  <h2 id="contact-heading">Contact us</h2>
  <p>
    The best way to get in touch is to come along on a Saturday morning, or to find us on
    <a href="https://www.facebook.com/BanburyShed" target="_blank" rel="noopener">Facebook</a>.
  </p>
  <p><a href="/contact/">Contact details &rarr;</a></p>
</section>
