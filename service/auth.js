function login() {
    let username = $("#your_name").val()
    let password = $("#your_pass").val()

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
        success: function (data) {
            sessionStorage.setItem("token", data.token)
            sessionStorage.setItem("userLogging", data.id)
            $("#username").val("")
            $("#password").val("")
            findAllFood()
            let content = `<span><i class="fa-regular fa-user" style="font-size: 15px;"></i>${data.name}</span> | <button class="btn btn-danger" onclick="logout()">Log out</button>`
            $("#header-auth").html(content)
        },
        error: function () {
            alert("Login failed!")
        }
    })
}
//  <span id="outAcc" style="display: block"><i class="fa-regular fa-user" style="font-size: 15.5px;"></i></span>
function logout() {
    sessionStorage.clear()
    let content = `<button class="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#auth">Sign in</button>
            |
            <button class="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#auth">Sign up</button>`
    $("#header-auth").html(content)
}

function displayRegisterForm() {
    document.getElementById("formLogin").style.display = "none"
    document.getElementById("list_food").style.display = "none"
    document.getElementById("page_control").style.display = "none"
    document.getElementById("formRegister").style.display = "block"
}

function register() {
    let username = $("#name_register").val()
    let password = $("#pass").val()
    let idRole = $("#role").val();

    let user = {
        username: username,
        password: password,
        roles: [
            {
                id: idRole
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
        success: function (data) {
            $("#username").val("")
            $("#password").val("")
            displayFormLogin()
            alert("Register successfully!")
        }
    })
}

function displayFormLogin() {
    document.getElementById("formLogin").style.display = "block"
    document.getElementById("list_food").style.display = "none"
    document.getElementById("page_control").style.display = "none"
    document.getElementById("formRegister").style.display = "none"
}
