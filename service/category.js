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
    let content = `<button onclick="displayFormCreateCategory()">Add new category</button>
                        <table border="1"> 
                        <tr><th>ID</th>
                        <th>Name</th>
                        <th>Action</th></tr>`
    for (let i = 0; i < value.length; i++) {
        content += `<tr>
                    <th>${value[i].id}</th>
                    <th>${value[i].name}</th>
                    <th><button onclick="displayFormUpdateCategory(${value[i].id})">Update</button></th>
                    </tr>
                   `
    }
    content += `</table>`
    document.getElementById("list_category").innerHTML = content
    document.getElementById("list_category").style.display = "block"
    document.getElementById("create_category").style.display = "none"
    document.getElementById("update_category").style.display = "none"
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
            document.getElementById("list_category").style.display = "none"
        }
    })
}

function updateCategory() {
    let name = $("#name-u").val()
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


