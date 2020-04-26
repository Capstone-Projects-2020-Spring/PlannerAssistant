var user = document.getElementById('user');

user.onclick = function () {
    console.log("user page");
    var container = document.getElementById("container");
    container.innerHTML = "";

    var profile_inject = document.createElement('div');
    profile_inject.id = 'profile_inject';
    
    var authorize = document.createElement('button');
    authorize.id = 'authorize_button';
    authorize.innerHTML = 'Sign in';
    //authorize.style = "display: none;";
    
    var signout = document.createElement('button');
    signout.id = 'signout_button';
    signout.innerHTML = 'Sign out'
    //signout.style = "display: none;";

    container.appendChild(profile_inject);
    profile_inject.appendChild(authorize);
    profile_inject.appendChild(signout);
};