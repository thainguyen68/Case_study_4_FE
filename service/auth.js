function login() {
    let username = $("#username").val()
    let password = $("#password").val()

    let user = {
        username: username,
        password: password
    }

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/api/auth/login",
        type: "POST",
        data: JSON.stringify(user),
        success: function (data){
            sessionStorage.setItem("token", data.token)
            findAll()
            $("#username").val("")
            $("#password").val("")

            let content = `<span>${data.name}</span> | <button class="btn btn-danger" onclick="logout()">Log out</button>`
            $("#header-auth").html(content)
        },
        error: function () {
            alert("Login failed!")
        }
    })
}

function logout() {
    sessionStorage.clear()
    let content = `<button class="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#auth">Sign in</button>
            |
            <button class="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#auth">Sign up</button>`
    $("#header-auth").html(content)
}

function registerForm() {
    $("#modal-auth").html("Register")
    $("#btn-auth").html("Sign up").attr("onclick", "register()")
}
function register() {
    let username = $("#username").val()
    let password = $("#password").val()


    let user = {
        username: username,
        password: password,
        roles: [
            {
                id: 2
            }
        ]
    }

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/api/auth/register",
        type: "POST",
        data: JSON.stringify(user),
        success: function (data){
            $("#username").val("")
            $("#password").val("")
            $("#modal-auth").html("Login")
            $("#btn-auth").html("Sign in").attr("onclick", "login()")
            alert("Register successfully!")
        }
    })
}
