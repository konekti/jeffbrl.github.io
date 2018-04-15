<div class="upper-area">
<div class="container contact-with-newsletter">
  <!-- Start:About Info -->
  <div class="col-md-4">
    <div class="about-info">
      <div class="footer-logo"><a href="#" ><img alt="" src="{{ site.baseurl }}/assets/footer-logo.png"></a></div>
      <ul class="social-media-icon-list">
        <!-- loop through icons -->
        {% for icon in site.data.icons %}
          <li><a href='{{ icon.link }}' target = '_blank'><i class="fa fa-{{ icon.name }}"></i></a></li>
        {% endfor %}
      </ul>
    </div>
  </div>
  <!-- Start:Useful Links -->
  <div class="col-md-8">
    <div class="useful-link-sec">
      <h5>Useful Links</h5>
      <ul class="useful-links">
        {% for section in site.data.sections %}
          <li><a href='{{ site.baseurl }}/#{{ section.id }}'>{{ section.text }}</a></li>
        {% endfor %}
          <li><a href="/blog/">Blog</a></li>
      </ul>
    </div>
  </div>
  </div>
</div>
<!-- Start:copyright -->
<div class="bottom-area">
  <div class="container">
    <div class="copyright">
      <div>© Copyright <div class = 'year'></div> Konekti Systems <span>  | </span>  Designed By <a href="https://societypieces.com/author/">One</a></div>
        <a id="scroll-top-div" href="#"><i class="fa fa-hand-pointer-o" aria-hidden="true"></i></a>
    </div>
  </div>
</div>
</footer>
<script>
  {% include js/jquery.js %}
  {% include js/index.js %}
</script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script>
  {% include js/mini-grid.js %}
  {% include js/settings.js %}
  {% include js/featherlight.js %}
</script>
