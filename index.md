---
layout: default
title: Banbury Shed & RVS Community
leaflet: true
---

<img src="{{ '/assets/images/banbury_shed_cropped.jpg' | relative_url }}" alt="Banbury Shed" class="shed-hero">

## About Banbury Shed {#about-heading}

Banbury Shed is a welcoming community workshop where people can share practical skills,
collaborate on projects, and enjoy good company. We meet nearly every Saturday morning at 09:30 (see the top of the page for our next meeting date).
New members are always welcome, just turn up!

[More about us →](/about/)

## [Latest news](/news/) {#news-heading}

{% assign featured_posts = site.posts | where_exp: "post", "post.featured" %}
{% for post in featured_posts limit:3 %}
### [{{ post.title }}]({{ post.url }})

<time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%d %B %Y" }}</time>

{{ post.excerpt }}
{% include photo-carousel.html images=post.images alt=post.title variant="thumb" %}
{% endfor %}

[All news →](/news/)

{% include find-us.html %}

## Contact us {#contact-heading}

The best way to get in touch is to come along on a Saturday morning, or to find us on
[Facebook](https://www.facebook.com/BanburyShed){:target="_blank" rel="noopener"}.

[Contact details →](/contact/)
