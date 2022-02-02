let currentUser

$(document).ready(function () {

    loadCurrentUser()

});

async function loadCurrentUser() {

    const response = await fetch("http://localhost:8080/user/current")

    if (response.status === 200) {
        currentUser = await response.json()
        await fillCurrentUserInfo()
    } else {
        console.log(response.statusText)
    }
}
async function fillCurrentUserInfo() {

    (function fillCurrentUserTable(){

        let temp = '';
        temp += '<tr>';
        temp += '<td>' + currentUser.id + '</td>';
        temp += '<td>' + currentUser.firstname + '</td>';
        temp += '<td>' + currentUser.lastname + '</td>';
        temp += '<td>' + currentUser.age + '</td>';
        temp += '<td>' + currentUser.email + '</td>';
        temp += '<td>';
        for (let role of currentUser.roles) {
            temp += role.name.substring(5) + ' '
        }
        temp += '</tr>'

        document.getElementById('currentUserTable').tBodies[0].innerHTML = temp}());

    (function fillTopNavbar(){
        let temp =""
        temp += '<span> '
        temp += currentUser.email + ' with roles: '
        for (let role of currentUser.roles) {
            temp += role.name.substring(5) + ', '
        }
        temp = temp.slice(0, -2) + '</span>'

        $('#topNavbarUserInfo').empty().append(temp)
    }());
}

