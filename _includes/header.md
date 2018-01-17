<header class="header-area">
  <div class="container">
    <!-- Start: Top Logo Area -->
    <div class="col-md-3 left-side">
      <div class="logo"><a href="{{ site.baseurl }}/"><img src="{{ site.baseurl }}/assets/top-logo.png" alt=""></a></div>
    </div>
    <div class="mob-icon"><i class="fa fa-bars"></i></div>
  <!-- Start:Main Navigation -->
    <div class="col-md-9 right-side">
      <div class="menu-bar">
        <nav>
          <ul class="menu">
          <!--Loop through site sections-->
          {% for section in site.data.sections %}
            <li><a href='{{ site.baseurl }}/#{{ section.id }}'>{{ section.text }}</a></li>
          {% endfor %}
           <li><a href="{{ site.baseurl }}/blog/">Blog</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</header>
