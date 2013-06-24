xianminx
========
> Update: Github site now supports REDCARPET2. See https://help.github.com/articles/using-jekyll-with-pages


As github Jekyll does not support redcarpet2(! Really, although sounds rediculous), I had to push static html files to github pages. 

Thus I created `blog` directory under `xianminx.github.com`. This is used to hold all source files used by Jekyll to generate result files. 

1. Locally, `cd xianminx.github.com/blog/` 
2. Use `jekyll --server` to generate `_site` directory
3. Copy the generated files to the root directory: `cp -r \_site/\* ../`

## Prerequesites: 

under root directory `xianminx.github.com`

* Add a .nojekyll file: `touch .nojekyll`.
* Locally, install jekyll, pygments, redcarpet2, See [here](https://github.com/mojombo/jekyll/wiki/Install).
Take OS X for example:

```bash
sudo gem update --system
sudo gem install jekyll
sudo easy_install Pygments
gem install redcarpet
```

* Install the redcarpet2 plugins by putting the file https://github.com/nono/Jekyll-plugins/blob/master/redcarpet2_markdown.rb in a folder named `_plugins` in `blog/`.


* Config `blog/_config.yml` file:

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

