xianminx
========

As github Jekyll does not support redcarpet2(! Really, although sounds rediculous), I had to push static html files to github pages. 

Thus I created `blog` directory under `xianminx.github.com`. This is used to hold all source files used by Jekyll to generate result files. 

1. locally, `cd xianminx.github.com/blog/ 
2. use `jekyll --server` to generate `\_site` directory
3. copy the generated files to the root directory: `cp -r \_site/\* ../`

Prerequesite: 

under root directory `xianminx.github.com`
1. add a .nojekyll file: `touch .nojekyll`.
2. locally, install jekyll, pygments, redcarpet2, See [here](https://github.com/mojombo/jekyll/wiki/Install).
Take OS X for example:

```bash
sudo gem update --system
sudo gem install jekyll
sudo easy_install Pygments
```

To install the plugins simply put them in a folder named `_plugins` in your
project directory.


Redcarpet 2
-----------

This plugin uses [Redcarpet 2](https://github.com/tanoku/redcarpet) to render
Markdown, and [pygments](http://pygments.org/) for syntax hightlighting.

Install the redcarpet gem with `gem install redcarpet`.

It's possible to choose the redcarpet that you want to use by adding theses
lines to the `_config.yml` file:

```yaml
markdown: redcarpet2
redcarpet:
  extensions: ["no_intra_emphasis", "fenced_code_blocks", "autolink", "strikethrough", "superscript", "with_toc_data"]
```

And the nice bonus is that you no longer need to `{% highlight %}` to
highlight code. You can simply use the fenced code blocks like on github:

    ```ruby
    puts "This code will be highlighted"
    ```

See [here](https://github.com/nono/Jekyll-plugins) for Jekyll Redcarpt2 plugin.  

