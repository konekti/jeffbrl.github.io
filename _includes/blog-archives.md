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
            <li><a href="{{site.baseurl}}{{post.url}}">{{ post.title }}</a></li>
            {% endfor %}
        </ul>
        {% endfor %}
    </ul>
    {% endfor %}
  </div>