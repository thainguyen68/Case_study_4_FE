// phương thức findAll food
function findAllFood() {
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        },
        url: "http://localhost:8080/api/foods",
        type: "GET",
        success: function (data){
            console.log(data)
            displayAllFood(data.content)
        }
    })
}

function displayAllFood(value){
    let content = `<div class="container">`
        for (let i = 0; i < value.length; i++) {
        content += `<div class="container_inner">`
            content += `<div class="">${value[i].id}</div>`
            content +=  `<h3>${value[i].name}</h3>`
            content +=` <span>${value[i].price} VND</span>&ensp;&ensp;|&ensp;&ensp;`
            content += `<p>Category : ${value[i].category.name}</p>`
            content += `<p>User : ${value[i].user.username}</p>`
            content += ` <a href="#form" class="btn btn-warning"
                             onclick="displayFormUpdate(${value[i].id})">Update</a>`
            content += ` <button class="btn btn-danger"
                            onclick="deleteFood(${value[i].id})">Delete</button>
                    </div>`
    }
    content += `</div>`
    document.getElementById("list_food").innerHTML = content
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
                                    <div class="col-lg-3">
                                        <img onclick="detailFood(${data.id})" 
                                            src="${data.imagePath}" alt="">
                                        <h3>${data.name}</h3>
                                        <span>${data.price}</span>&ensp;&ensp;|&ensp;&ensp; 
                                        <p>Category : ${data.category.name}</p>
                                        <p>Category : ${data.user.name}</p>
                                        <a href="#list" class="btn btn-warning" 
                                            onclick="findAllFood()">Back to home</a>
                                    </div>
                                    <div class="col-lg-9">Description / Shopping</div>
                                 </div>`
            $("#list_food").html(content)
            $("#page_control").css("display", "none")
        }
    })
}


function displayFormUpdate(){}
function deleteFood(){}