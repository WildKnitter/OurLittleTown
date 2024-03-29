"use strict";
//This scripts contains code to calculate the price of a car rental.
//Author:  Pam Belknap

//DETERMINE THE CAR RENTAL TOTALS

window.onload = function () {
    const btnPrice = document.getElementById("btnPrice");
    const resetBtn1 = document.getElementById("resetBtn");
    btnPrice.onclick = carRentalTotal;
    resetBtn1.onclick = resetBtn;
}

function resetBtn() {
    document.getElementById("errorMsg").style.display = "none";
    location.reload(true);
}

function carRentalTotal() {
    let numberOfDays = Number(document.getElementById("numberOfDays").value);
    let electronicTollTag = document.getElementById("electronicTollTag").checked;
    let gps = document.getElementById("gps").checked;
    let roadsideAssist = document.getElementById("roadsideAssist").checked;
    let pickupDate = document.getElementById("pickupDate").value;

    let electronicTollTagTotal;
    let gpsTotal;
    let roadsideAssistTotal;
    let carRentalSubtotal;
    let carRentalOptionsTotal;
    let under25SurChargeTotal;
    let totalPrice;
    let returnDate;

    // Validation:    
    if (numberOfDays <= 0) {
        const errorMsg = document.getElementById("errorMsg");
        errorMsg.innerHTML = "One or more of your inputs is a negative number or blank!";
        document.getElementById("totals").style.display = "none";
        return;
    }
    else {
        const errorMsg = document.getElementById("errorMsg");
        errorMsg.innerHTML = " ";
        document.getElementById("totals").style.display = "block";
    }

    //Determine the return date
    pickupDate = new Date(pickupDate);

    //milliseconds per day
    let msec_per_day = 1000 * 60 * 60 * 24;
    //how many milliseconds in days rented
    let msec_per_multidays = (msec_per_day * numberOfDays);
    // add the milliseconds and subtract out 1 day
    returnDate = (pickupDate.getTime() + msec_per_multidays + msec_per_day);
    //convert the milliseconds to a regular date
    returnDate = new Date(returnDate);
    returnDate = returnDate.toDateString()

    let carRentalRate;
    let carType = document.getElementById("carType");

    if (carType.selectedIndex == 0) {
        carRentalRate = 29.99;
    }
    else if (carType.selectedIndex == 1) {
        carRentalRate = 39.99;
    }
    else if (carType.selectedIndex == 2) {
        carRentalRate = 49.99;
    }
    else {
        carRentalRate = 59.99;
    }
    if (electronicTollTag) {
        electronicTollTagTotal = 3.95;
    }
    else {
        electronicTollTagTotal = 0;
    }

    if (gps) {
        gpsTotal = 2.95;
    }
    else {
        gpsTotal = 0;
    }

    if (roadsideAssist) {
        roadsideAssistTotal = 2.95;
    }
    else {
        roadsideAssistTotal = 0;
    }

    if (document.getElementById("under25No").checked) {
        under25SurChargeTotal = 0;
    }
    else {
        under25SurChargeTotal = ((carRentalRate * numberOfDays) * .30);
    }

    document.getElementById("returnDate").value = returnDate;

    carRentalSubtotal = (carRentalRate * numberOfDays);
    document.getElementById("carRentalSubtotal").value = carRentalSubtotal.toFixed(2);

    carRentalOptionsTotal = ((electronicTollTagTotal + gpsTotal + roadsideAssistTotal) * numberOfDays);
    document.getElementById("carRentalOptionsTotal").value = carRentalOptionsTotal.toFixed(2);

    document.getElementById("under25SurChargeTotal").value = under25SurChargeTotal.toFixed(2);

    totalPrice = (carRentalSubtotal + carRentalOptionsTotal + under25SurChargeTotal);
    document.getElementById("totalPrice").value = totalPrice.toFixed(2);
}







