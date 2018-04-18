<head>
  <meta charset="utf-8">
  <title>{{ site.title }}</title>
  {% assign desc = page.excerpt | default: site.description | strip_html | normalize_whitespace | truncate: 150 | escape %}
  <meta itemprop = 'description' name="description" content="{{ desc }}">
  <meta property="og:description" content="{{ desc }}">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta http-equiv='X-UA-Compatible' content='IE=edge'>
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

  <!-- set twitter's and facebook's opengraph -->
  {% if page.thumbnail %} <!-- If thumbnail is set -->
    {% assign thumbnail-url  = '/assets/posts/' | prepend: site.url | append: page.thumbnail | append: '.jpg' %}
  {% else %} 
    {% assign thumbnail-url =   '/assets/posts/' | prepend: site.url | append: page.image |  append: '.jpg' %}
  {% endif %}
  {% if page.image %}
    <meta property='og:image' content= '{{ thumbnail-url }}' />
    <meta property='og:image:width' content='720' />
    <meta property='og:image:height' content='360' />
    <meta name='twitter:site' content='@{{site.twitter}}' />
    <meta name='twitter:image' content = '{{ thumbnail-url }}' />
    <meta name='twitter:card' content='summary' />
    <meta name='twitter:creator' content='@{{site.twitter}}' />
    <meta property='og:description'  content="{{ desc }}"/>
  {% endif %}
 <!-- Opengraph settings end here -->

  <link rel="shortcut icon" href="{{ site.baseurl }}/fav.PNG">
  <link rel="canonical" href="{{ page.url | replace:'index.htm l','' | absolute_url }}">

  {% include analytics.md %}

  <script src="https://use.fontawesome.com/22572db09e.js"></script> 
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
  <style>
    {% include css/main.css %}
    {% include css/background.css %}
  </style>
  <link rel = 'stylesheet' href = '/assets/main.css'>
</head>
