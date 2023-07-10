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
            contentBill += `<div>${value[i].id}</div>`
            contentBill += `<div>${value[i].status}</div>`
            contentBill += `<div>${value[i].user.username}</div>`
            for (let j = 0; j < value[i].food.length; j++) {
                contentBill += `<div>${value[i].food[j].name}</div>`
                contentBill += `<div>${value[i].food[j].price}</div>`
                contentBill += `<div>${value[i].food[j].quantity}</div>`
            }
            contentBill += `<div><button>Edit-quantity</button>
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