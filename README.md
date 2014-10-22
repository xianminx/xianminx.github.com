xianminx
========
> Update: Github site now supports REDCARPET2. See https://help.github.com/articles/using-jekyll-with-pages

## Prerequesites:
If you want to test what your blogs look like before pushing them to Github, install ruby gem `jekyll` locally.

install jekyll, pygments, redcarpet2, See [here](https://github.com/mojombo/jekyll/wiki/Install).

Take OS X for example:

```bash
sudo gem update --system
sudo gem install jekyll
sudo easy_install Pygments
gem install redcarpet
```


## Build
With http://jekyllrb.com/
## Bootstrap support

Add bootstrap support by adding
```xml
<link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css" />

<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.2/js/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
```
to _layouts/default.liquid.


Check commit #cea137a0fa8c104a05c20765220ca0cae32a7d24 for more detail.



## Bootstrap Material Design
http://fezvrasta.github.io/bootstrap-material-design/
