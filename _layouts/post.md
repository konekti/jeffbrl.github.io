---
layout: default
comments: true
permalink: pretty
published: true
---
<div class = 'cool libro'>
 <div class = 'overlay'>
   <div class="post-header">
    <div class = 'cover'>
      <h1 class="post-title" itemprop="name headline">{{ page.title | escape }}</h1>
      <time datetime="{{ page.date | date_to_xmlschema }}" itemprop="datePublished">
        <h4 class = 'duration lighten'>
        {{ page.date | date: '%b %d, %Y' }} <span class = 'apart'>|</span>
        {% assign time = content| number_of_words | divided_by:170 %}{{ time }} min read
        </h4>
      </time>
      <h4 itemprop="name" class = 'flex-in'><a href = '/'>{{ page.author }}</a></h4>
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
      {{ content }}
      {% include mobile.md %}
    </div>
    {% if site.disqus.shortname %}
      {% include disqus.md %}
    {% endif %}
  </div>
  <aside class = 'child trio'>
    <h4><span class = 'pretty'>Archives</span></h4>
    <div id = 'accordion'>   
    {% assign postsByYear = site.posts | group_by_exp:"post", "post.date | date: '%Y'" %}
    {% for year in postsByYear %}
      <h3 class = 'pretty'><i class="fa fa-caret-right" aria-hidden="true"></i> {{ year.name }}</h3>
      <ul>
       {% assign postsByMonth = year.items | group_by_exp:"post", "post.date | date: '%b'" %}
       {% for month in postsByMonth %}
         <h3 class = 'pretty deep'><i class="fa fa-caret-right" aria-hidden="true"></i> {{ month.name }}</h3>
         <ul>
           {% for post in month.items %}
             <li><a href="{{site.baseurl}}/{{ post.url }}">{{ post.title }}</a></li>
            {% endfor %}
         </ul>
        {% endfor %}
    </ul>
    {% endfor %}
    </div>
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
    <h4><span class = 'pretty'>Twitter Feed</span></h4>
    <a class="twitter-timeline" href="https://twitter.com/{{site.twitter}}" data-tweet-limit="{{ site.data-tweet-limit }}"></a>
    <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
  </aside>
</article>
