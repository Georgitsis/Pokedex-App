#POKEDEX-APP#

##Description##
A simple ongoing, ever growing pokemon library project, to showcase html, javascript, bootstrap and css skills.
Displays  a list of pokemon and shows more information about a selected pokemon in a modal.
A search by pokemon name is also possible

##Link to the live web page##
https://psychoboyjack83.github.io/Pokedex-App/

##API-link##
https://pokeapi.co/api/v2/pokemon/?limit=600

##Files and Folders##
dist: holds minified javascript files and minified scc files
src: working scss and javascript file
img: holds all the images of the app
ESLint rules are under src/js/eslintrc

##Dependencies##

###Fetch promise polyfills###
the project uses fetch and promises. To run properly also on older browser make sure the following are included right after the footer as first java scripts:
    <script scr="dist/js/promise-polyfill.js"></script>
    <script scr="dist/js/fetch-polyfill.js"></script>

###Bootstrap###
The project uses bootstrap for several of its features and needs its own stylesheet in the head of the html file.
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

and...

Bootstrap needs jQuery to run properly. make sure following lines are included after the footer and after the two polyfills from before:
    <script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
