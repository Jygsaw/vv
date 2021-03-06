VV
==

VV is a Neovim client for macOS. A pure, fast, minimalistic Vim experience with good macOS integration.

![VV screenshot](assets/screenshot.png)

* Fast text render.
* OS integration: copy/paste, mouse, scroll.
* Fullscreen support for native and simple (fast) mode.
* All app settings configurable via vimscript.
* Command line launcher.
* “Save All” dialog on quit and “Refresh” dialog on external changes.
* Text zoom.

VV is built on Electron. There are no barriers to porting it to Windows or Linux, or making plugins with Javascript, HTML, and CSS.

Download
--------

You need Neovim installed to run VV. You can find Neovim installation instructions here: https://github.com/neovim/neovim/wiki/Installing-Neovim. Neovim version 0.3 and higher is recommended.

You can download the most recent release from the [Releases](https://github.com/igorgladkoborodov/vv/releases/latest) page.

Build manually
--------------

You can also build it manually. You will need [Node.js](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/lang/en/) installed.

```
git clone git@github.com:igorgladkoborodov/vv.git
cd vv
yarn
yarn electron:build
```

This will generate a VV.app binary in the dist directory.  Copy VV.app to your /Applications folder and add the CLI launcher `vv` to your `/usr/local/bin`.

Command Line Launcher
---------------------

You can use the `vv` command to run VV in a Terminal. Install it via the `VV → Command Line Launcher...` menu item. VV will add the command to your `/usr/local/bin` folder. If you prefer another place, you can link the command manually:

```
ln -s -f /Applications/VV.app/Contents/Resources/bin/vv [dir from $PATH]/vv
```

Usage: `vv [options] [file ...]`

You can specify one or more space-separated files or directories. These will be opened in separate windows. If no files are passed, VV will open the current directory.

Options are passed to `nvim` as is. You can check available options in nvim help: `nvim --help`.

Settings
--------

You can setup VV-specific options via the `:VVset` command. It works the same as the vim built-in command `:set`. For example `:VVset nofullscreen` is the same as `:VVset fullscreen=0`. You can use `:help set` for syntax reference.

* `fullscreen`, `fu`: Switch to fullscreen mode. You can also toggle fullscreen with `Cmd+Ctrl+F`. Default: `0`.
* `simplefullscreen`, `sfu`: Use simple or standard fullscreen mode. Simple mode is faster than standard macOS fullscreen mode. It does not have any transition animation. Default: `1`.
* `bold`: Allow bold font. You can completely disable bold even if the colorscheme uses it. Default: `1`.
* `italic'`: Allow italic. Default: `1`.
* `underline`: Allow underline. Default: `1`.
* `undercurl`: Allow undercurl. Default: `1`.
* `fontfamily`: Font family. Syntax is the same as CSS `font-family`. Default: `monospace`.
* `fontsize`: Font size in pixels. Default: `12`.
* `lineheight`: Line height related to font size. Pixel value is `fontsize * lineheight`. Default: `1.25`.
* `letterspacing`: Fine-tuning letter spacing in retina pixels. Can be a negative value. For retina screens the value is physical pixels. For non-retina screens it works differently: it divides the value by 2 and rounds it. For example, `:VVset letterspacing=1` will make characters 1 pixel wider on retina displays and will do nothing on non-retina displays. Value 2 is 2 physical pixels on retina and 1 physical pixel on non-retina. Default: `0`.
* `reloadchanged`: Show dialog when opened files are changed externally. For example, when you switch git branches. It will prompt you to keep your changes or reload the file. Default: `1`.
* `windowwidth`, `width`: Window width. Can be a number in pixels or percentage of display width. Default: `60%`.
* `windowheight`, `height`: Window height. Default: `80%`.
* `windowleft`, `left`: Window position from left. Can be a number in pixels or a percentage. Percent values work the same as the `background-position` rule in CSS. For example: 20% means the window’s left border will be offset 20% of your screen. 0% — the very left, 100% — the very right, 50% — center. Default: `50%`.
* `windowtop`, `top`: Window position top. Default: `50%`.

You can use these settings in your `init.vim`.  You can check if VV is loaded by checking the `g:vv` variable:

```
if exists('g:vv')
  VVset nobold
  VVset noitalic
  VVset windowheight=100%
  VVset windowwidth=60%
  VVset windowleft=0
  VVset windowtop=0
endif
```

Development
-----------

First, you need start a webpack watch process in a separate terminal:
```
yarn webpack:watch
```

Then you can run the app:
```
yarn start
```

This app is in active development. This project was started as personal experiements with Neovim API, so the code is quite chaotic.  There are no tests, no static typing etc; so, any PRs or feedback are highly welcome.

Testing
-------

TBD

Name
----

The VV name comes from the bash shortcut `vv` that I use to start Vim.

License
-------

VV is released under the [MIT License](https://opensource.org/licenses/MIT).
