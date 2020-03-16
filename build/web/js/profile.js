var user = doucment.getElementById('user');

user.onclick = function () {

    var container = document.getElementById("container");

    var profile_inject = document.createElement('div');
    profile_inject.id = 'profile_inject';

    container.appendChild(profile_inject);
};