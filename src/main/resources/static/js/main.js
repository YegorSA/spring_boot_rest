// alert('hi')

let allRoles

$(document).ready(function () {

    loadUsers()

    loadRoles()

    fillCurrentUserTable()

    //alert('I refreshed :(')

    $('#userTable').on('click', '.eBtn', function (event) {
        //document.getElementsByClassName('eBtn').addEventListener('click'...
        event.preventDefault()
        $(this).closest()
        $('#edit-user-id').val(($(this).closest('tr').find("td:eq(0)").text()))
        $('#edit-user-firstname').val(($(this).closest('tr').find("td:eq(1)").text()))
        $('#edit-user-lastname').val(($(this).closest('tr').find("td:eq(2)").text()))
        $('#edit-user-age').val(($(this).closest('tr').find("td:eq(3)").text()))
        $('#edit-user-email').val(($(this).closest('tr').find("td:eq(4)").text()))
        $('#edit-user-roles').empty()
        for (role of allRoles) {
            let selectedStatus = $(this).closest('tr').find("td:eq(5)").text().includes(role.name.substring(5)) ? 'selected' : ''
            //alert( $(this).closest('tr').find("td:eq(5)").text() + selectedStatus)

            $('#edit-user-roles').append('<option value=\'' + role.id + '\'' + selectedStatus + '>' + role.name.substring(5) + '</option>')

            //alert('<option value=\'' + role.name + '\'>' + role.name.substring(5) + '</option>')
            //console.log(role.name)
        }
        $('#editModal').modal()
    })

    $('#editForm').on('submit', function (event) {
        event.preventDefault()

        //alert(JSON.stringify($('#editForm').serializeArray()))

        // let editForm = $('#editForm').serializeArray();
        // let data = JSON.stringify($('#editForm').serializeArray())
        //
        // var editFormObject = {};
        // $.each(editForm,
        //     function(i, v) {
        //         editFormObject[v.name] = v.value;
        //     });


        // const data = {};
        // // for(const pair of new FormData(document.querySelector('#editForm'))) {
        // //     data[pair[0]] = pair[1];
        // // }
        // let formData = new FormData(document.querySelector('#editForm'))
        // //formData.forEach((value, key) => (data[key] = value))
        // formData.forEach((value, key) => {
        //     if (!Reflect.has(data, key)) {
        //         data[key] = value;
        //         return;
        //     }
        //     if (!Array.isArray(data[key])) {
        //         data[key] = [data[key]];
        //     }
        //     data[key].push(value);
        // });
        //let data = JSON.stringify(Object.fromEntries(formData.entries()))
        //alert(JSON.stringify($("#editModal").serializeArray().map(function(x){data[x.name] = x.value;})))

        //console.log(data);
        //console.log(JSON.stringify(data));

        //alert($('#editForm').serializeJSON())
        // $.post('http://localhost:8080/admin/edit', data, function (data) {
        //     alert('Response' + data)
        // });
        //$.post('http://localhost:8080/admin/edit', data)

        // const request = new XMLHttpRequest();
        // request.open("POST", 'http://localhost:8080/admin/edit');
        // request.send(formData);

        // alert(data)

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

        console.log(JSON.stringify(user));

        $.ajax({
            url: 'http://localhost:8080/admin/edit',
            type: 'POST',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(user)

        })

        $('#editModal').modal('hide')

        loadUsers()
    });


    //loadRoles()

    //let allRoles
    //alert(allRoles)


    //console.log(allRoles)
    //alert(allRoles[0])

/*
    $('#userTable').on('click', '.eBtn', function (event) {
    //document.getElementsByClassName('eBtn').addEventListener('click'...
        event.preventDefault()

        //let href = $(this).attr('href')
        //alert($(this).closest('tr').find("td:eq(5)").text())

        $('#edit-user-id').val(($(this).closest('tr').find("td:eq(0)").text()))
        $('#edit-user-firstname').val(($(this).closest('tr').find("td:eq(1)").text()))
        $('#edit-user-lastname').val(($(this).closest('tr').find("td:eq(2)").text()))
        $('#edit-user-age').val(($(this).closest('tr').find("td:eq(3)").text()))
        $('#edit-user-email').val(($(this).closest('tr').find("td:eq(4)").text()))
        //$('#edit-user-roles').val(($(this).closest('tr').find("td:eq(5)").text()))


        //$('#userTable').tBodies[0].

        //this.closest('tr')

        // $.get(href, function (user, status) {
        //     $('#edit-user-id').val(user.id)
        //     $('#edit-user-firstname').val(user.firstname)
        //     $('#edit-user-lastname').val(user.lastname)
        //     $('#edit-user-age').val(user.age)
        //     $('#edit-user-email').val(user.email)
        //     $('#edit-user-roles').val(user.roles)
        // });

        $('#editModal').modal()
    });
*/

    $('#userTable').on('click', '.delBtn', function (event) {
        event.preventDefault()
        let href = $(this).attr('href')

        $.get(href, function (user, status) {
            $('#delete-user-id').val(user.id)
            $('#delete-user-firstname').val(user.firstname)
            $('#delete-user-lastname').val(user.lastname)
            $('#delete-user-age').val(user.age)
            $('#delete-user-email').val(user.email)
            $('#delete-user-roles').val(user.roles)
        });

        $('#deleteModal').modal()

    })

});

function loadRoles() {
    if (allRoles === undefined) {
        allRoles = fetch('http://localhost:8080/admin/roles')
            .then(response => response.json())
            .then(data => {
                //console.log(data)
                allRoles = data
                //console.log(data)
                //alert(allRoles)
            })
    }
}

async function loadUsers() {
    const usersResponse = await fetch("http://localhost:8080/admin/users");
    const users = await usersResponse.json();
    alert('hey')
    if (users.length > 0) {
        let temp = ""
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
        })
        document.getElementById('userTable').tBodies[0].innerHTML = temp
    }
}

async function fillCurrentUserTable() {
    const response = await fetch("http://localhost:8080/admin/users/")
}

async function fillModal(event) {

    event.preventDefault()
    let allRoles
    if (allRoles === null) {
        allRoles = fetch('http://localhost:8080/admin/roles')
            .then(response => response.json())
            .then(data => {
                //console.log(data)
                //allRoles = data
                //console.log("data", data)
                //alert(data)
            })
    }

    //let href = $(this).attr('href')
    //alert($(this).closest('tr').find("td:eq(5)").text())

    $('#edit-user-id').val(($(this).closest('tr').find("td:eq(0)").text()))
    $('#edit-user-firstname').val(($(this).closest('tr').find("td:eq(1)").text()))
    $('#edit-user-lastname').val(($(this).closest('tr').find("td:eq(2)").text()))
    $('#edit-user-age').val(($(this).closest('tr').find("td:eq(3)").text()))
    $('#edit-user-email').val(($(this).closest('tr').find("td:eq(4)").text()))

    $('#editModal').modal()
}
/*
function fillUserTable(users) {
    if (users.length > 0) {
        let temp = ""
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
        })
        document.getElementById('userTable').tBodies[0].innerHTML = temp
    }
}
*/
