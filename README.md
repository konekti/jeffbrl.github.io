https://konekti.us

#### Add ability to set og:description in post

You can now set this explicitly by either specifying a **description** or **headline** value in front matter like so:

```yaml
...
description: Tous les générateurs de Lorem Ipsum sur Internet tendent à reproduire le même extrait sans fin
...
```

Or

```yaml
...
headline: Tous les générateurs de Lorem Ipsum sur Internet tendent à reproduire le même extrait sans fin
...
```

One of these should suffice. However, if you choose to include both, the **headline** value shall take precedence

#### Add ability to define twitter card image in _config.yaml.

**I decided that I don't need to change this on a per-post basis.**

```yaml
defaults:
  - scope:
     ...
    values:
      ...
      image: postimage.jpg
      twitter_image: postimage.jpg 
```

> Make sure the images are inside **/assets/posts/**. Also be sure to include the file extension of the image file

