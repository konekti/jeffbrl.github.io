<!DOCTYPE html>
<html lang="{{ page.lang | default: site.lang | default: "en" }}">
  {% include head.md %}

  <body>
    {% include header.md %}
    {{ content }}
    {% include footer.md %}
  </body>
</html>
