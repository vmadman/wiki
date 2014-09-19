Markdown Wiki
====

This is a simple wiki engine that uses only markdown files to create its menu structure, and render pages. It is a self-modified clone of
[mdwiki](https://github.com/Dynalon/mdwiki) by Timo Dörr.

This fork of the `mdwiki` was restructured in such a way as to make all of the scripts modular, instead of compiled into a single `html` file. This
project is not professionally maintained, and is intended for my personal use. If you are looking for a real, useful product, you should look at
the original author's repository, since they are far more versed in this.

contributions and pull requests are welcome, however.

Building
====

To build this wiki, you will need `nodejs`, `bower`, and `grunt-cli`.
You can easily install `bower` and `grunt-cli` with the following commands.

> npm install -g bower
> npm install -g grunt-cli

To build this wiki, simply clone the repository and run the `node` installs, and the `bower` installs.

> git clone http://github.com/ciel/wiki
> cd wiki
> npm install
> bower install

Once all of this is finished, just run the `grunt` builder to compile it into the `/dist` folder.

> grunt release



