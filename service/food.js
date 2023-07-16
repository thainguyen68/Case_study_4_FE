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




function sortAllFoodByPriceASC() {
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        },
        url: "http://localhost:8080/api/foods/sort_price_asc",
        type: "GET",
        success: function (data){
            displayAllFood(data.content)
            displayPageControl("changePageSortASC", data)
        }
    })
}
//phương thức chuyển trang của page sort
function changePageSortASC(page_number) {
    $.ajax({
        url: `http://localhost:8080/api/foods/sort_price_asc?page=${page_number}`,
        type: "GET",
        success: function (data) {
            displayAllFood(data.content)
            displayPageControl("changePageSortASC", data)
        }
    })
}





function sortAllFoodByPriceDSC() {
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        },
        url: "http://localhost:8080/api/foods/sort_price_dsc",
        type: "GET",
        success: function (data){
            displayAllFood(data.content)
            displayPageControl("changePageSortDSC", data)
        }
    })
}
//phương thức chuyển trang của page sort
function changePageSortDSC(page_number) {
    $.ajax({
        url: `http://localhost:8080/api/foods/sort_price_dsc?page=${page_number}`,
        type: "GET",
        success: function (data) {
            displayAllFood(data.content)
            displayPageControl("changePageSortDSC", data)
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
    let content = `<div class="grid__row">`
        for (let i = 0; i < value.length; i++) {
        content += `<div class="grid__column-2-4">`
            content += `<div class="home-product-item">`
            // content += `<div class="">${value[i].id}</div>`
            content +=  `<div class="home-product-item__image"> <a href="#header">
            <img  onclick="detailFood(${value[i].id})" class="container_inner-img" src="${value[i].imagePath}" alt="empty">
            </a></div>`
            content +=  `<h3 class="home-product-item__name">${value[i].name}</h3>`
            content +=`<div class="home-product-item__price">`
            // content +=` <span class="home-product-item__price-old">₫ ${value[i].price}</span>`
            content +=` <span class="home-product-item__price-current">₫ ${value[i].price}</span>`
            content += `</div>`

            content +=` <p class="container_inner-category">Số lượng : ${value[i].quantity} </p>`
            content += `<div class="home-product-item__action">
                                            <span class="home-product-item__like home-product-item__like--liked">
                                                <i class="home-product-item__like-icon-empty far fa-heart"></i>
                                                <i class="home-product-item__like-icon-fill fas fa-heart"></i>
                                            </span>
                                        <div class="home-product-item__star">
                                            <i class="home-product-item__star--gold fas fa-star"></i>
                                            <i class="home-product-item__star--gold fas fa-star"></i>
                                            <i class="home-product-item__star--gold fas fa-star"></i>
                                            <i class="home-product-item__star--gold fas fa-star"></i>
                                            <i class="home-product-item__star--gold fas fa-star"></i>
                                        </div>
                                        <span class="home-product-item__sold">
                                                Đã bán 689
                                            </span>
                                    </div>`

            content += `<div class="home-product-item__origin">
                                        <span class="home-product-item__brand"> ${value[i].category.name}</span>
                                        <span class="home-product-item__origin-name">${value[i].user.username}</span>
                                    </div>`
            content += `<div class="home-product-item__favourite">
                                        <i class="fas fa-check"></i>
                                        <span>Yêu thích</span>
                                    </div>`
            content += ` <div class="home-product-item__sale-off">
                                        <span class="home-product-item__sale-off-percent">10%</span>
                                        <span class="home-product-item__sale-off-label">Giảm</span>
                                    </div>`
            content += ` <div class="home-product-item__origin" style="display: flex;justify-content: end"><button class="btn btn-danger"
                            onclick="createBill(${value[i].id})">Buy</button></div> `
             content += `</div>`
             content += `</div>`
    }
    content += `</div>`
    document.getElementById("list_food").innerHTML = content
    document.getElementById("list_food").style.display = "block"
    document.getElementById("create").style.display = "none"
    document.getElementById("update").style.display = "none"
    document.getElementById("bill").style.display = "none"
    document.getElementById("create_category").style.display = "none"
    document.getElementById("update_category").style.display = "none"
    document.getElementById("list_category").style.display = "none"

}


function detailFood(id) {
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        url: `http://localhost:8080/api/foods/${id}`,
        type: "GET",
        success: function (data) {
            let content = `<div class="grid__row-views">`
            content += `<div class="grid__column-2-4" >`
            content += `<div class="home-product-item">`
            // content += \`<div class="">${value[i].id}</div>`
            content += `<div class="home-product-item__image"><img  onclick="detailFood(${data.id})" class="container_inner-img" src="${data.imagePath}" alt="empty"></div>`
            content +=  `<h3 class="home-product-item__name">${data.name}</h3>`
            content +=`<div class="home-product-item__price">`
            // content +=` <span class="home-product-item__price-old">₫ ${data.price}</span>`
            content +=` <span class="home-product-item__price-current">₫ ${data.price}</span>`
            content += `</div>`

            content +=` <p class="container_inner-category">Số lượng : ${data.quantity} </p>`
            content += `<div class ="home-product-item__action">`
                               content +=  `<span class="home-product-item__like home-product-item__like--liked">`
                                               content += `<i class="home-product-item__like-icon-empty far fa-heart"></i>`
                                               content +=`<i class="home-product-item__like-icon-fill fas fa-heart"></i>`
                               content += `</span>`

                    content +=   `<div class="home-product-item__star">
                                            <i class="home-product-item__star--gold fas fa-star"></i>
                                            <i class="home-product-item__star--gold fas fa-star"></i>
                                            <i class="home-product-item__star--gold fas fa-star"></i>
                                            <i class="home-product-item__star--gold fas fa-star"></i>
                                            <i class="home-product-item__star--gold fas fa-star"></i>
                                  </div>`

            content +=    `<span class="home-product-item__sold">Đã bán 689 </span>`
            content +=  `</div>`

            content += `<div class="home-product-item__origin">
                                        <span class="home-product-item__brand"> ${data.category.name}</span>
                                        <span class="home-product-item__origin-name">${data.user.username}</span>
                                    </div>`
            content += `<div class="home-product-item__favourite">
                                        <i class="fas fa-check"></i>
                                        <span>Yêu thích</span>
                                    </div>`
            content += ` <div class="home-product-item__sale-off">
                                        <span class="home-product-item__sale-off-percent">10%</span>
                                        <span class="home-product-item__sale-off-label">Giảm</span>
                                    </div>`
             content += `</div>`
             content += `</div>`

            content += `<div class=" grid__column-2-4" style="margin: auto">`
            content += `<button class="btn btn-warning" 
                                            onclick="displayFormUpdate(${data.id})">Update</button>
                                        <button class="btn btn-danger" style="max-width: 50px"
                                            onclick="deleteFood(${data.id})">Delete</button>
                                    </div>       
                                 </div>`
            content += `</div>`

            $("#list_food").html(content)
            $("#page_control").css("display", "none")
            document.getElementById("create_category").style.display = "none"
            document.getElementById("update_category").style.display = "none"
            document.getElementById("list_category").style.display = "none"
            document.getElementById("create").style.display = "none"
            document.getElementById("update").style.display = "none"
            document.getElementById("bill").style.display = "none"
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
    document.getElementById("bill").style.display = "none"
    document.getElementById("create_category").style.display = "none"
    document.getElementById("update_category").style.display = "none"
    document.getElementById("list_category").style.display = "none"

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
    document.getElementById("bill").style.display = "none"
    document.getElementById("create_category").style.display = "none"
    document.getElementById("update_category").style.display = "none"
    document.getElementById("list_category").style.display = "none"

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
    let image = $("#image-u")[0].files[0]

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
        `<a href="#header" class="pagination-item__link" id="prev" 
                onclick="${action}(${page.number} - 1)"> <i class="pagination-item__icon fas fa-chevron-left"></i></a>
        <span class="pagination-item__link">${page.number + 1}</span> | 
        <span class="pagination-item__link">${page.totalPages}</span>
        <a href="#header" class="pagination-item__link" id="next" 
                onclick="${action}(${page.number} + 1)"> <i class="pagination-item__icon fas fa-chevron-right"></i></a>`
    $("#page_control").html(data).css("display", "flex")
    if (page.first) {
        $("#prev").css("display", "none")
    } else if (page.last) {
        $("#next").css("display", "none")
    }
}

