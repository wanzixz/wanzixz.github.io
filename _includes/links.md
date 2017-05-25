{% include links.md nodes=site.data.links %}

{% for post in site.posts %}
[{{ post.title }}]:{{ post.url }}
{% endfor %}