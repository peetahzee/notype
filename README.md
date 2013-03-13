notype
======

For the lazy graders.

##Usage

Clone the repository into a directory. Then, in Chrome, go to chrome://extensions, select "Load unpacked extension", then choose the directory you cloned to.

Whenever you're in a textarea (e.g. Github issue tracker comment), press `ctrl + opt + t` (`ctrl + alt + t` in non-Macs), and select one of the canned responses from the popup by pressing the corresponding number.

Right now this extension is quite raw, and all configs are done manually. All the canned responses are located under `script.js`, inside the array of objects called `cans`. To add/remove/edit any of the entries, modify that array, and press "reload" under the Chrome extensions page.
