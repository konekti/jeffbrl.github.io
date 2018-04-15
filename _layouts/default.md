<!DOCTYPE html>
<html lang="{{ page.lang | default: site.lang | default: "en" }}">
  {% include head.md %}
  <body>
    {% if page.menu == 'dark' %}
      {% assign opaque = 'header-dark'%}
      {% assign margin = 'main__padded' %}
    {% endif %}
    <header class="header-area {{ opaque }}">
      {% include header.md %}
    </header>
    <div class = 'main__content {{ margin }}'>
      {{ content }}
    </div>
    <footer class="footer-area">
      {% include footer.md %}
    </footer>
  </body>
</html>
