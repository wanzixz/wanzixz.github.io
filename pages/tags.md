---
layout: default
title: 标签云
tagspage: true
---

<main class="col-md-8 main-content">
    <article class="post page">
        <header class="post-head">
            <h1 class="post-title">{{ page.title }}</h1>
        </header>
        <section class="post-content  widget">
            <div class="tag-cloud ">
            	{% for tag in site.tags %}
                <a class="pjaxlink" href="#{{ tag[0] }}" title="{{ tag[0] }}" rel="{{ tag[1].size }}">{{ tag[0] }}</a> 
              {% endfor %}
            </div>
        </section>
				{% for tag in site.tags %}
					<h2 class="listing-seperator" id="{{ tag[0] }}">{{ tag[0] }}</h2>
					<ul class="listing">
					{% for post in tag[1] %}
					  <li class="listing-item">
					  <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
					  <a class="pjaxlink" href="{{ post.url }}" title="{{ post.title }}">{{ post.title }} ——【{{ post.categories }}】</a>
					  </li>
					{% endfor %}
					</ul>
				{% endfor %}
    </article>
</main>
 {% include aside.html %}
