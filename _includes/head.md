<head>
  <meta charset="utf-8">
  <title>{{ site.title }}</title>
  <meta itemprop = 'description' name="description" content="{{ page.excerpt | default: site.description | strip_html | normalize_whitespace | truncate: 160 | escape }}">
  <meta property="og:description" content="{{ page.excerpt | default: site.description | strip_html | normalize_whitespace | truncate: 160 | escape }}">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" />
  <meta name="keywords" content="konekti systems">
  <meta property="og:locale" content="en_US" />
  {% if page.layout == 'post' %}
    <meta property="og:type" content="article" />
    <meta property="og:title" content="{{page.title}}" />
    <meta property="og:url" content="{{site.baseurl}}/{{page.title}}" />
    <meta property="article:published_time" content="{{page.date | date_to_xmlschema}}" />
    <script type="application/ld+json">
      {"@context": "http://schema.org",
      "@type": "BlogPosting"",
      "name": "{{site.title}}",
      "headline": "{{page.tite}}",
      "description": "{{page.description}}",
      "url": "{{site.baseur}}/{{page.permalink}}"}
    </script>
  {% endif %}
  <link rel="shortcut icon" href="{{ site.baseurl }}/fav.PNG">
  <link rel="canonical" href="{{ page.url | replace:'index.htm l','' | absolute_url }}">
  {% if jekyll.environment == 'production' and site.google_analytics %}
    {% include analytics.md %}
  {% endif %}
  <script src="https://use.fontawesome.com/22572db09e.js"></script> 
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
  <style>
     {% include css/animate.css %}
     {% include css/flexslider.css %}
     {% include css/main.css %}
     {% include css/posts.css %}
     {% include css/critical.css %}
  </style>
</head>
