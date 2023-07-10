// phương thức findAllFood
function findAllFood() {
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        },
        url: "http://localhost:8080/api/foods",
        type: "GET",
        success: function (data){
            displayAllFood(data.content)
            displayPageControl("changePage", data)
        }
    })
}


//phương thức chuyển trang của page bình thường
function changePage(page_number) {
    $.ajax({
        url: `http://localhost:8080/api/foods?page=${page_number}`,
        type: "GET",
        success: function (data) {
            displayAllFood(data.content)
            displayPageControl("changePage", data)
        }
    })
}





// phương thức lay search
function searchFoodByName(){
    let nameSearch = $("#search").val()

    $.ajax({
        url: "http://localhost:8080/api/foods/search",
        type: "GET",
        data: {search:nameSearch},
        success: function (data) {
            sessionStorage.setItem("search", nameSearch)
            displayAllFood(data.content)
            displayPageControl("changePageSearch", data)

        },
        error: function () {
            alert("Not fount food")
        }
    })
}

//phương thức chuyển trang của page search
function changePageSearch(page_number) {
    let search = sessionStorage.getItem("search")

    $.ajax({
        url: `http://localhost:8080/api/foods/search?search=${search}&&page=${page_number}`,
        type: "GET",
        success: function (data) {
            displayAllFood(data.content)
            displayPageControl("changePageSearch", data)
        }
    })
}











//phương thức phân trang filter
function changePageByFilter(page_number) {
    let min = sessionStorage.getItem("min")
    let max = sessionStorage.getItem("max")
    let name = sessionStorage.getItem("name")
    $.ajax({
        url: `http://localhost:8080/api/foods/filter?
        min=${min}&&max=${max}&&name=${name}&&page=${page_number}`,
        type: "GET",
        success: function (data) {
            displayAllFood(data.content)
            displayPageControl("changePageByFilter", data)
        }
    })
}


//phương thưc tìm kiếm nhiều trường
function filterMulti() {
    let min = $("#min").val()
    let max = $("#max").val()
    let name = $("#name-search").val()
    sessionStorage.setItem("min", min)
    sessionStorage.setItem("max", max)
    sessionStorage.setItem("name", name)
    $.ajax({
        url: `http://localhost:8080/api/foods/filter?
        min=${min}&&max=${max}&&name=${name}`,
        type: "GET",
        success: function (data) {
            displayAllFood(data.content)
            displayPageControl("changePageByFilter", data)
        }
    })
}

//phương thưc tìm kiếm nhiều trường
function clearFilter() {
    $("#min").val("")
    $("#max").val("")
    $("#name").val("")
    findAllFood()
}
















function displayAllFood(value){
    let content = `<div class="container_box">`
        for (let i = 0; i < value.length; i++) {
        content += `<div class="container_inner">`
            // content += `<div class="">${value[i].id}</div>`
            content +=  `<img  onclick="detailFood(${value[i].id})" class="container_inner-img" src="${value[i].imagePath}" alt="empty">`
            content +=  `<h3 class="container_inner-name">${value[i].name}</h3>`
            content +=` <span class="container_inner-price">${value[i].price} VND</span>`
            content +=` <p class="container_inner-category">${value[i].quantity} </p>`
            content += `<p class="container_inner-category">Category : ${value[i].category.name}</p>`
            content += `<p class="container_inner-user">User : ${value[i].user.username}</p>`
            content += ` <button class="btn btn-danger"
                            onclick="createBill(${value[i].id})">Buy</button>                 
            </div>`
    }
    content += `</div>`
    document.getElementById("list_food").innerHTML = content
    document.getElementById("list_food").style.display = "block"
    document.getElementById("create").style.display = "none"
    document.getElementById("update").style.display = "none"
}


function detailFood(id) {
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        url: `http://localhost:8080/api/foods/${id}`,
        type: "GET",
        success: function (data) {
            let content = `<div class="row">
                                    <div class="container_inner">
                                        <img class="container_inner-img" onclick="detailFood(${data.id})" 
                                            src="${data.imagePath}" alt="">
                                        <h3 class="container_inner-name">${data.name}</h3>
                                        <span class="container_inner-price">${data.price}</span>
                                        <p class="container_inner-category">${data.quantity}</p>
                                        
                                        <p class="container_inner-category">Category : ${data.category.name}</p>
                                        <p class="container_inner-user">User : ${data.user.username}</p>
                                        <button class="btn btn-warning" 
                                            onclick="displayFormUpdate(${data.id})">Update</button>
                                        <button class="btn btn-danger"
                                            onclick="deleteFood(${data.id})">Delete</button>
                   
                                        <button  class="btn btn-warning" 
                                            onclick="findAllFood()">Back to home</button>
                                    </div>
                                    <div class="col-lg-9">Description /....</div>
                                 </div>`
            $("#list_food").html(content)
            $("#page_control").css("display", "none")
        }
    })
}


//phương thức lấy categories
function getCategoriesCreate() {
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        url: "http://localhost:8080/api/categories",
        type: "GET",
        success: function (categories) {
            let content = `<select id="category-id" class="form-select" aria-label="Default select example">
                <option selected>Open this select menu</option>`
            for (let i = 0; i < categories.length; i++) {
                content += `<option value="${categories[i].id}">${categories[i].name}</option>`
            }
            content += `</select>`
            $("#category-select").html(content)
        }
    })
}

function getCategoriesUpdate() {
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        url: "http://localhost:8080/api/categories",
        type: "GET",
        success: function (categories) {
            let content = `<select id="category-id-update" class="form-select" aria-label="Default select example">
                <option selected>Open this select menu</option>`
            for (let i = 0; i < categories.length; i++) {
                content += `<option value="${categories[i].id}">${categories[i].name}</option>`
            }
            content += `</select>`
            $("#category-select-u").html(content)
        }
    })
}



function displayFormCreate(){
    getCategoriesCreate()
    document.getElementById("create").style.display = "block"
    document.getElementById("list_food").style.display = "none"
    document.getElementById("update").style.display = "none"
    document.getElementById("page_control").style.display = "none"
}


function createFood() {
    let formData = getFormDataCreate()

    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        url: "http://localhost:8080/api/foods",
        processData: false,
        contentType: false,
        type: "POST",
        data: formData,
        success: function () {
            findAllFood()
        }
    })
}


let idUpdate;
function displayFormUpdate(id){
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        url: `http://localhost:8080/api/foods/${id}`,
        type: "GET",
        success: function (data) {
            idUpdate = data.id
            console.log(idUpdate)
            $("#name-u").val(data.name)
            $("#price-u").val(data.price)
            $("#quantity-u").val(data.quantity)
            $("#page_control-u").css("display", "none")
            getCategoriesUpdate()
        }
    })
    document.getElementById("update").style.display = "block"
    document.getElementById("create").style.display = "none"
    document.getElementById("list_food").style.display = "none"
    document.getElementById("page_control").style.display = "none"
}

function updateFood() {
    let formData = getFormDataUpdate();

    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        url: `http://localhost:8080/api/foods/${idUpdate}`,
        processData: false,
        contentType: false,
        type: "PUT",
        data: formData,
        success: function () {
            findAllFood()
        },
        error: function () {
            alert("Food not exists!")
        }
    })
}


//phương thức xóa food
function deleteFood(id) {
    if (confirm("Are you sure?")) {
        $.ajax({
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
            },
            url: `http://localhost:8080/api/foods/${id}`,
            type: "DELETE",
            success: function (data) {
                findAllFood()
            }
        })
    }
}


//phương thức lấy data cho form create và form update
function getFormDataCreate() {
    let name = $("#name").val()
    let price = $("#price").val()
    let quantity = $("#quantity").val()
    let loggingUser = sessionStorage.getItem("userLogging");
    let userId =  parseInt(loggingUser)
    let categoryId = $("#category-id").val()
    let image = $("#image")[0].files[0]

    let food = {
        name: name,
        price: price,
        quantity: quantity,
        user: {
            id: userId
            // id: 5
        },

        category: {
            id: categoryId
        }
    }

    let formData = new FormData()
    formData.append("image", image)
    formData.append("food", new Blob([JSON.stringify(food)], {type: "application/json"}))
    return formData;
}


function getFormDataUpdate() {
    let name = $("#name-u").val()
    let price = $("#price-u").val()
    let quantityU = $("#quantity-u").val()

    let loggingUser = sessionStorage.getItem("userLogging");
    let userId =  parseInt(loggingUser)
    let categoryId = $("#category-id-update").val()
    let image = $("#image")[0].files[0]

    let food = {
        name: name,
        price: price,
        quantity: quantityU,
        user: {
            id: userId
            // id: 5
        },

        category: {
            id: categoryId
        }
    }

    let formData = new FormData()
    formData.append("image", image)
    formData.append("food", new Blob([JSON.stringify(food)], {type: "application/json"}))
    return formData;
}








//phương thức hiển thị phần chuyển trang
//thay đổi phương thức chuyển trang dựa vào action
function displayPageControl(action, page) {
    let data =
        `<a href="#list" class="btn btn-info" id="prev" 
                onclick="${action}(${page.number} - 1)">Prev</a>
        <span>${page.number + 1}</span> | 
        <span>${page.totalPages}</span>
        <a href="#list" class="btn btn-info" id="next" 
                onclick="${action}(${page.number} + 1)">Next</a>`
    $("#page_control").html(data).css("display", "block")
    if (page.first) {
        $("#prev").css("display", "none")
    } else if (page.last) {
        $("#next").css("display", "none")
    }
}

