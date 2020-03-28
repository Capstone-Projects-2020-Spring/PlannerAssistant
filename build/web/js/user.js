window.onload = function () {

    var container = document.getElementById("container");
    container.innerHTML = "";

    //create container DOM element for home page contents
    var home_inject = document.createElement('div');
    home_inject.id = 'home_inject';

    //appends all the created DOM elements to the index.html 'container' div
    container.appendChild(home_inject);
};