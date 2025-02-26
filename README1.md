# Asylum

### update 2025-02-07

update to use nextjs + mdx + tailwindcss for serverless static site.

### update 2018-09-15

update local jekyll:

```sh

# install ruby version manager rbenv as jekyll is written in ruby.
brew install rbenv

# install new ruby version 2.5.1
rbenv install 2.5.1

# activate the new ruby version globally.
rbenv global 2.5.1

# install bundler and jekyll as ruby gems
gem install bundler jekyll
# create new site
#     jekyll new my-awesome-site
#     cd my-awesome-site

# install github-pages gem locally, see https://github.com/github/pages-gem
bunlde install

# start up the site locally.
bundle exec jekyll serve

# => Now browse to http://localhost:4000
```

### update 2017-02-16

Update the blog, use tool [hyde](https://github.com/hyde/hyde) and theme [poole/hyde](https://github.com/poole/hyde) instead.

#### Setup

install ruby, gem, bundler, jekyll

#### Test & Run

```sh
bundle exec jekyll s --host=0.0.0.0
```

### update 2016-09-23

Github updated its jekyll engine. See [Setting up your GitHub Pages site locally with Jekyll](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/) for detailed setup instructions.
