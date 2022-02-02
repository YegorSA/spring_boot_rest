let allRoles
let currentUser

$(document).ready(function () {

    loadRoles()

    loadCurrentUser()

    fillUserTable()

    $('#userTable').on('click', '.eBtn', fillEditModal)

    $('#editForm').on('submit', submitEditForm)

    $('#userTable').on('click', '.delBtn', fillDeleteModal)

    $('#deleteForm').on('submit', submitDeleteForm)

    $('#newUserForm').on('submit', submitNewUserForm)

    alert("page refreshed")
});

async function loadRoles() {

    const response = await fetch('http://localhost:8080/admin/roles')
    if (response.status === 200){
        allRoles = await response.json()
        for (role of allRoles) {
            $('#newUserRoles').append('<option value=\'' + role.id + '\'' + '>' + role.name.substring(5) + '</option>')
        }
    } else {
        console.log(response.statusText)
    }

}

async function loadCurrentUser() {

    const response = await fetch("http://localhost:8080/user/current")

    if (response.status === 200) {
        currentUser = await response.json()
        fillCurrentUserInfo()
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

        document.getElementById('currentUserTable').tBodies[0].innerHTML = temp    }());

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

async function fillUserTable() {

    const response = await fetch("http://localhost:8080/admin/users");

    if (response.status === 200) {
        const users = await response.json();
        let temp = "";
        users.forEach(user => {
            temp += '<tr>'
            temp += '<td>' + user.id + '</td>'
            temp += '<td>' + user.firstname + '</td>'
            temp += '<td>' + user.lastname + '</td>'
            temp += '<td>' + user.age + '</td>'
            temp += '<td>' + user.email + '</td>'
            temp += '<td>'
            for (let role of user.roles) {
                temp += role.name.substring(5) + ' '
            }
            temp += '</td>'
            temp += `<td>
                            <button type="button" class="btn btn-primary eBtn">Edit</button>
                     </td>`
            temp += `<td>
                            <button type="button" class="btn btn-danger delBtn">Delete</button>
                     </td>`
            temp += '</tr>'

            if (user.id === currentUser.id) {
                currentUser = user
                fillCurrentUserInfo()
            }
        });
        document.getElementById('userTable').tBodies[0].innerHTML = temp;
    } else {
        console.log(response.statusText)
    }
}

async function fillEditModal(event) {

    event.preventDefault()

    $('#edit-user-id').val(($(this).closest('tr').find("td:eq(0)").text()))
    $('#edit-user-firstname').val(($(this).closest('tr').find("td:eq(1)").text()))
    $('#edit-user-lastname').val(($(this).closest('tr').find("td:eq(2)").text()))
    $('#edit-user-age').val(($(this).closest('tr').find("td:eq(3)").text()))
    $('#edit-user-email').val(($(this).closest('tr').find("td:eq(4)").text()))
    $('#edit-user-password').empty()
    $('#edit-user-roles').empty()
    for (role of allRoles) {
        let selectedStatus = $(this).closest('tr').find("td:eq(5)").text().includes(role.name.substring(5)) ? 'selected' : ''
        $('#edit-user-roles').append('<option value=\'' + role.id + '\'' + selectedStatus + '>' + role.name.substring(5) + '</option>')
    }
    $('#editModal').modal()
}

async function submitEditForm(event) {

    event.preventDefault()

    const url = 'http://localhost:8080/admin/users/:' + document.getElementById("edit-user-id").value

    let roleList = () => {
        let array = []
        let options = document.querySelector('#edit-user-roles').options
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                let role = {id: options[i].value, name: "ROLE_" + options[i].text}
                array.push(role)
            }
        }
        return array;
    }

    let user = {
        id: document.getElementById("edit-user-id").value,
        firstname: document.getElementById("edit-user-firstname").value,
        lastname: document.getElementById("edit-user-lastname").value,
        age: document.getElementById("edit-user-age").value,
        email: document.getElementById("edit-user-email").value,
        password: document.getElementById("edit-user-password").value,
        roles: roleList()
    }

    try {
        const response = await fetch(url, {
            method: "PATCH",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const editedUser = await response.json();
        console.log('Успех:', JSON.stringify(editedUser));
    } catch (error){
        console.error('Ошибка:', error)
    }

    console.log(JSON.stringify(user));

    $('#editModal').modal('hide')

    fillUserTable()

}

async function fillDeleteModal(event) {

    event.preventDefault()

    $('#delete-user-id').val(($(this).closest('tr').find("td:eq(0)").text()))
    $('#delete-user-firstname').val(($(this).closest('tr').find("td:eq(1)").text()))
    $('#delete-user-lastname').val(($(this).closest('tr').find("td:eq(2)").text()))
    $('#delete-user-age').val(($(this).closest('tr').find("td:eq(3)").text()))
    $('#delete-user-email').val(($(this).closest('tr').find("td:eq(4)").text()))
    $('#delete-user-password').empty()
    $('#delete-user-roles').empty()
    for (role of allRoles) {
        let selectedStatus = $(this).closest('tr').find("td:eq(5)").text().includes(role.name.substring(5)) ? 'selected' : ''
        $('#delete-user-roles').append('<option value=\'' + role.id + '\'' + selectedStatus + '>' + role.name.substring(5) + '</option>')
    }
    $('#deleteModal').modal()


}

async function submitDeleteForm(event) {

    event.preventDefault()

    const url = 'http://localhost:8080/admin/users/:' + document.getElementById("delete-user-id").value

    try {
        const response = await fetch(url, {
            method: 'DELETE'
        })
        console.log('Успех', response.status)
    } catch (error){
        console.error('Ошибка:', error)
    }

    $('#deleteModal').modal('hide')

    fillUserTable()
}

async function submitNewUserForm(event) {

    event.preventDefault()

    const url = 'http://localhost:8080/admin/users'

    let roleList = () => {
        let array = []
        let options = document.querySelector('#newUserRoles').options
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                let role = {id: options[i].value, name: "ROLE_" + options[i].text}
                array.push(role)
            }
        }
        return array;
    }

    let user = {
        firstname: document.getElementById("newUserFirstName").value,
        lastname: document.getElementById("newUserLastname").value,
        age: document.getElementById("newUserAge").value,
        email: document.getElementById("newUserEmail").value,
        password: document.getElementById("newUserPassword").value,
        roles: roleList()
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const createdUser = await response.json();
        console.log('Успех:', JSON.stringify(createdUser));

    } catch (error){
        console.error('Ошибка:', error)
    }

    $('a[href="#usersList"]').trigger('click')

    fillUserTable()
}
