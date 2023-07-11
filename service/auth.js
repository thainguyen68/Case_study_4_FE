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
            let content = `<span class="container_inner-acc"><i class="fa-regular fa-user" style="font-size: 15px; margin-right: 4px"></i>${data.name}</span> <button class="btn-logout" onclick="logout()">Log out</button>`
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

   findAllFood()
    let content = `
                <div class="auth-button-container">
                                <button class="auth-button"  data-bs-toggle="modal" data-bs-target="#login" >Login</button>
                            </div>
                            <span style="display: block; border-right: 5px solid white"></span>
                            <div  class="auth-button-container">
                                <button class="auth-button" data-bs-toggle="modal" data-bs-target="#register">Register</button>
                            </div>
                </div>`

    $("#header-auth").html(content)
}

function displayRegisterForm() {
    document.getElementById("formLogin").style.display = "none"
    document.getElementById("list_food").style.display = "none"
    document.getElementById("page_control").style.display = "none"
    document.getElementById("bill").style.display = "none"
    document.getElementById("formRegister").style.display = "block"
}

function register() {
    let username = $("#name_register").val()
    let password = $("#pass_register").val()
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
            alert("Register successfully!")
        },
        error: function () {
            alert("Register fail!")
        }
    })
}

function displayFormLogin() {
    document.getElementById("formLogin").style.display = "flex"
    document.getElementById("list_food").style.display = "none"
    document.getElementById("page_control").style.display = "none"
    document.getElementById("formRegister").style.display = "none"
    document.getElementById("bill").style.display = "none"

}
