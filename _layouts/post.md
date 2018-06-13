---
permalink: pretty
layout: default
comments: true
---

<div class = 'cool' style = 'background-image:url(/assets/posts/{{page.image}}.jpg);'>
 <div class = 'overlay'>
   <div class="post-header">
    <div class = 'cover'>
    </div>
   </div>
 </div>
</div>
<article class = 'flex post blog container'>
  <div class = 'child strip'>
    <div class = 'tablet'>
      {% include share.md %}
    </div>
  </div>
  <div class = 'child tripple'>
    <div class="post-content" itemprop="articleBody">
      <h1 class="post-title" itemprop="name headline">{{ page.title | escape }}</h1>
      <time datetime="{{ page.date | date_to_xmlschema }}" itemprop="datePublished">
        <div class = 'duration'>
        {{ page.date | date: '%b %d, %Y' }} <span class = 'apart'>|</span><small>by </small><a href = '/'>{{ page.author }}</a><span class = 'apart'>|</span>
        {% assign time = content| number_of_words | divided_by:170 %}{{ time }} min read
        </div>
      </time>
      {{ content }}
      {% include mobile.md %}
    </div>
    {% if site.disqus.shortname %}
      {% include disqus.md %}
    {% endif %}
  </div>
  <aside class = 'child trio'>
    <!-- include archives -->
    {% include blog-archives.md %}
    <!-- show recent posts if there are more than one posts -->
    {% if site.posts.size > 1 %}
    <h4><span class = 'pretty'>Recent Posts</span></h4>
    <ul class="post-list">
      {% for post in site.posts limit:6 %}
      {% if post != page %}
        <li>
          <a class="post-link" href="{{ post.url | relative_url }}"><i class="icon icon-book" aria-hidden = 'true'></i>{{ post.title | escape }}</a>
        </li>
      {% endif %}
      {% endfor %}
    </ul>
    {% endif %}
    <h4><span class = 'pretty'>Twitter Feed</span></h4>
    <a class="twitter-timeline" href="https://twitter.com/{{site.twitter}}" data-tweet-limit="{{ site.data-tweet-limit }}"></a>
    <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
  </aside>
</article>
