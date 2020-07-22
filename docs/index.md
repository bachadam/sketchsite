---
layout: default
---

<!-- <h1>{{ "Hello, Hello, Hello" | downcase }}</h1> -->

<h1>EXPERIMENTS & ATTEMPTS</h1>

<ul>
    {% for post in site.posts %}
        <li>
            <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
            <p>{{ post.excerpt }}</p>
        </li>
    {% endfor %}
</ul>
