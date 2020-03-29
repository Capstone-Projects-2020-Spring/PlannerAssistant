window.onload = function () {

    var container = document.getElementById("container");
    container.innerHTML = "";

    //create container DOM element for home page contents
    var home_inject = document.createElement('div');
    home_inject.id = 'home_inject';

    //stylistic container for the microphone button
    var mic_container = document.createElement('div');
    mic_container.id = 'mic_container';
    
    //creates the mic DOM image element
    var mic = document.createElement('img');
    mic.src = "./imgs/mic.png";
    mic.id= 'mic';

    //appends all the created DOM elements to the index.html 'container' div
    container.appendChild(home_inject);
    mic_container.appendChild(mic);
    container.appendChild(mic_container);
};