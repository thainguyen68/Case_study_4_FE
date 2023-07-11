function findAllCategory() {
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        url: "http://localhost:8080/api/categories",
        type: "GET",
        success: function (data) {
            displayTableCategory(data)
        }
    })
}
function displayTableCategory(value){
    let content = `
                     <div style="margin-top: 5%; margin-left: 11.2%; margin-bottom: 1%;">
                        <button class="btn btn-primary" style="text-decoration: none; color: white" onclick="displayFormCreateCategory()">Add new category</button>
                       </div>
                        <table style=" width: 500px;margin: auto" 
                        class="table table-hover"> 
                        <tr><th style="width: 40%">ID</th>
                        <th style="width: 40%">Name</th>
                        <th style="width: 20%">Action</th></tr>`
    for (let i = 0; i < value.length; i++) {
        content += `<tr>
                    <th>${value[i].id}</th>
                    <th>${value[i].name}</th>
                    <th><button class="btn btn-warning" 
                        data-bs-toggle="modal" data-bs-target="#category" onclick="displayFormUpdateCategory(${value[i].id})">Update</button></th>
                    </tr>
                   `
    }
    content += `</table>`
    document.getElementById("list_category").innerHTML = content
    document.getElementById("list_category").style.display = "block"
    document.getElementById("create_category").style.display = "none"
    document.getElementById("update_category").style.display = "none"
    document.getElementById("list_food").style.display = "none"
    document.getElementById("login").style.display = "none"
    document.getElementById("register").style.display = "none"
    document.getElementById("create").style.display = "none"
    document.getElementById("update").style.display = "none"
    document.getElementById("bill").style.display = "none"
    document.getElementById("page_control").style.display = "none"

}
function createCategory() {
    let name = $("#name-c").val()

    let category = {
        name: name,
    }

    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/api/categories",
        type: "POST",
        data: JSON.stringify(category),
        success: function () {
            findAllCategory()
        }
    })
}
function displayFormCreateCategory(){
    document.getElementById("create_category").style.display = "block"
    document.getElementById("list_category").style.display = "none"
    document.getElementById("register").style.display = "none"
    document.getElementById("create").style.display = "none"
    document.getElementById("update").style.display = "none"
    document.getElementById("bill").style.display = "none"
    document.getElementById("login").style.display = "none"
    document.getElementById("page_control").style.display = "none"


}
let categoryIdUpdate
function displayFormUpdateCategory(id) {
    $.ajax({
        url: `http://localhost:8080/api/categories/${id}`,
        type: "GET",
        success: function (category) {
            categoryIdUpdate = id
            $("#name-u").val(category.name)
            console.log(category.name)
            document.getElementById("update_category").style.display = "block"
            document.getElementById("create").style.display = "none"
            document.getElementById("register").style.display = "none"
            document.getElementById("update").style.display = "none"
            document.getElementById("bill").style.display = "none"
            document.getElementById("login").style.display = "none"
            document.getElementById("list_category").style.display = "none"
            document.getElementById("page_control").style.display = "none"



        }
    })
}

function updateCategory() {
    let name = $("#name-u-c").val()
    let category = {
        name: name
    }
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: `http://localhost:8080/api/categories/${categoryIdUpdate}`,
        type: "PUT",
        data: JSON.stringify(category),
        success: function () {
            findAllCategory()
        },
        error: function () {
            alert("Category not exists!")
        }
    })
}


