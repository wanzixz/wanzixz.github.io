---
layout: default
title: 文章列表
catepage: true
---

<main class="col-md-8 main-content">
    <article class="post page">
        <header class="post-head">
            <h1 class="post-title">{{ page.title }}</h1>
        </header>
        <section class="post-content  widget">
            <div class="tag-cloud ">
            	{% for cat in site.categories %}
                <a class="pjaxlink" href="#{{ cat[0] }}" title="{{ cat[0] }}" rel="{{ cat[1].size }}">{{ cat[0] }} ({{ cat[1].size }})</a>
              {% endfor %}
            </div>
        </section>
        {% for cat in site.categories %}
					<h2 id="{{ cat[0] }}">{{ cat[0] }}</h2>
					<ul>
					{% for post in cat[1] %}
					  <li class="listing-item">
					  <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
					  <a class="pjaxlink" href="{{ site.url }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
					  </li>
					{% endfor %}
					</ul>
				{% endfor %}
    </article>
</main>

{% include aside.html %}


