// phương thức hiển thị bills
function findAllBill() {
    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        },
        url: "http://localhost:8080/api/bills",
        type: "GET",
        success: function (data) {
            displayAllBill(data)
        }
    })
}




function displayAllBill(value) {
    let loggingUser = sessionStorage.getItem("userLogging");
    let loggingUserNow = parseInt(loggingUser)
    let contentBill = `<div class="container_Bill" >`
    for (let i = 0; i < value.length; i++) {
        if (value[i].user.id === loggingUserNow && value[i].status === false) {
            contentBill += `<div class="container_Bill_inner" style="margin-top: 80px">`
            contentBill += `<div class="container_Bill_inner-title">`
            contentBill += `<div class="container_Bill_id">Code Bill: ${value[i].id}</div>`
            contentBill += `<div class="container_Bill_status">Status Bill: ${value[i].status}</div>`
            contentBill += `<div class="container_Bill_buyer">Buyer: ${value[i].user.username}</div>`
            contentBill += `</div>`

            contentBill += `<div class="container_Bill_inner-title-food">`
            contentBill += `<div class="container_Bill_inner-title-food1">Name</div>`
            contentBill += `<div class="container_Bill_inner-title-food2">Price</div>`
            contentBill += `<div class="container_Bill_inner-title-food3">Quantity</div>`
            contentBill += `</div>`


            contentBill += `<div class="container_Bill_food" >`
            for (let j = 0; j < value[i].food.length; j++) {
                contentBill += `<div class="container_Bill_food-inner" >`
                contentBill += `<img class="container_Bill_food-img" src="${value[i].food[j].imagePath}">`
                contentBill += `<div class="container_Bill_food-name">${value[i].food[j].name}</div>`
                contentBill += `<div class="container_Bill_food-price">${value[i].food[j].price}</div>`
                contentBill += `<div class="container_Bill_food-quantity">${value[i].food[j].quantityBuy}</div>`
                contentBill += `</div>`
            }
            contentBill += `</div>`
            contentBill += `<div class="container_Bill_btn"><button>Edit-quantity</button>
                            <button>Pay</button></div>`
        }
    }
    contentBill += `</div>`
    document.getElementById("bill").innerHTML = contentBill
    document.getElementById("bill").style.display ="block"
}

let idFood;
function createBill(id){
   idFood = id
    let formBill = getFormDataBill()

    $.ajax({
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        url: "http://localhost:8080/api/bills",
        processData: false,
        contentType: false,
        type: "POST",
        data: formBill,
        success: function () {
            findAllBill()
        }
    })
}

function getFormDataBill() {
    let user =  sessionStorage.getItem("userLogging");
    let userId =  parseInt(user)


    let bill = {
        user: { id: userId}
    }

    let food = {
        id: idFood
    }

    let formBill = new FormData()
    formBill.append("bill", new Blob([JSON.stringify(bill)], {type: "application/json"}))
    formBill.append("food1", new Blob([JSON.stringify(food)], {type: "application/json"}))
    return formBill;
}