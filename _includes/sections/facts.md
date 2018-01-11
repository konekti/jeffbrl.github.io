<section class="home-fun-fact-area-outer-sec">
  <div class="home-fun-fact-area">
    <div class="container">
      <div style="display:none" class="fun-fact-sec">
        <ul class="fun-fact-items">
          {% for fact in site.data.facts %}
          <li>
            <div class="icon"><i class="fa fa-{{ fact.icon }}" aria-hidden="true"></i></div>
            <div class="text">
                <h2>{{ fact.number }}</h2>
                <p>{{ fact.text }}Clients</p>
            </div>	
          </li>
          {% endfor %}
        </ul>
      </div>
    </div>
  </div>
</section>