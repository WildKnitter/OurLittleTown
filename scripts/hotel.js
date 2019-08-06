"use strict";
//This script contains code to calculate the total price of the hotel stay.
// @param roomType - string - type of room (Queen, King, etc.)
// @param roomInfo - object - room type, max occupancy, high-season rate, low-season rate.
// @param numAdults - number - number of adults
// @param numKids - number - number of children
// @param checkInDate - date - date checking into hotel.
// @param numNights - number - number of nights stay
// @param discountType - string - type of discount (senior, military, AAA, or none)
// @param roomCostBeforeDiscount - number - room cost before discounts

//Author:  Pam Belknap

// Initialize

window.onload = function () {
    const btnPrice = document.getElementById("btnPrice");
    const resetBtn1 = document.getElementById("resetBtn");
    btnPrice.onclick = finalTotalCost;
    resetBtn1.onclick = resetBtn;
}

// Reset button

function resetBtn() {
    document.getElementById("errorMsg").style.display = "none";
    location.reload(true);
}

// This function breaks out your room choice and returns that line with roomType, 
// maxOccupancy, highSeasonRate, and lowseasonRate
// @param roomType - string - type of room (Queen, King, etc.)

function getRoomInfo(roomType) {
    let priceList = [
        { roomType: "queen", maxOccupancy: 5, highSeasonRate: 250, lowSeasonRate: 150 },
        { roomType: "king", maxOccupancy: 2, highSeasonRate: 250, lowSeasonRate: 150 },
        { roomType: "kingSuite", maxOccupancy: 4, highSeasonRate: 310, lowSeasonRate: 190 },
        { roomType: "twoBedroomSuite", maxOccupancy: 6, highSeasonRate: 350, lowSeasonRate: 210 }
    ];

    let roomInfo;
    for (let i = 0; i < priceList.length; i++) {
        if (priceList[i].roomType == roomType) {
            roomInfo = priceList[i];
            break;
        }
    }
    return roomInfo;
}

// This function checks to see if the selected room can hold the number of people entered into the 
// form
// @param roomInfo - object - room type, max occupancy, high-season rate, low-season rate.
// @param numAdults - number - number of adults
// @param numKids - number - number of children
function canRoomHoldCustomer(roomInfo, numAdults, numKids) {
    let canRoomHoldCustomerAnswer;
    let numPeopleTotal = (numAdults + numKids);
    if (numPeopleTotal > roomInfo.maxOccupancy)
    {
        const errorMsg = document.getElementById("errorMsg");
        errorMsg.innerHTML = "You have too many people for this room choice - Select another option!";
        document.getElementById("totals").style.display = "none";
        canRoomHoldCustomerAnswer = false;
        return;
    }
    else {
        const errorMsg = document.getElementById("errorMsg");
        errorMsg.innerHTML = " ";
        document.getElementById("totals").style.display = "block";
        canRoomHoldCustomerAnswer = true;
    }
    return canRoomHoldCustomerAnswer;
}
// This function will return the Room Cost, before any discounts or breakfast addition.
// Returns roomCostBeforeDiscount
function getroomCostBeforeDiscount(roomInfo, numNights) {
    let roomCostBeforeDiscount = 0;
    let hotelRate = roomInfo.lowSeasonRate;
    roomCostBeforeDiscount = (numNights * hotelRate);
    return roomCostBeforeDiscount;
}
// This function will return the Breakfast Cost
// Returns breakfastCost
// @param numAdults - number - number of adults
// @param numKids - number - number of children
// @param numNights - number - number of nights stay
// @param discountType - string - type of discount (senior, military, AAA, or none)

function getBreakfastCost(numAdults, numKids, numNights, discountType) {
    let breakfastCost;
    let breakfastCostKid = (numKids * 3.95 * numNights);
    let breakfastCostAdult = (numAdults * 6.96 * numNights);

    if ((document.getElementById("breakfastOption").checked == true) && (discountType != "senior")) {
        breakfastCost = breakfastCostKid + breakfastCostAdult;
    }
    else {
        breakfastCost = 0;
    }

    return breakfastCost;
}

// This function determines the room discount.
// @param discountType - string - type of discount (senior, military, AAA, or none)
// @param roomCostBeforeDiscount - number - room cost before discounts 
function getDiscount(roomCostBeforeDiscount, discountType) {
    let discountTotal;

    if ((discountType == "aaa") || (discountType == "senior")) {
        discountTotal = (roomCostBeforeDiscount * .1);
    }
    else if (discountType == "military") {
        discountTotal = (roomCostBeforeDiscount * .2);
    }
    else {
        discountTotal = 0;
    }
    return discountTotal;
}

function finalTotalCost() {
    // populate fields from hotel html page:
    let checkInDate = document.getElementById("checkInDate").value;
    let numNights = Number(document.getElementById("numNights").value);
    let numAdults = Number(document.getElementById("numAdults").value);
    let numKids = Number(document.getElementById("numKids").value);

    // Validations:

    if ((numNights <= 0) || (numAdults <= 0) || (numKids < 0))
    {
        const errorMsg = document.getElementById("errorMsg");
        errorMsg.innerHTML = "One or more of your inputs is a negative number!";
        document.getElementById("totals").style.display = "none";
        return;
    }
    else {
        const errorMsg = document.getElementById("errorMsg");
        errorMsg.innerHTML = " ";
        document.getElementById("totals").style.display = "block";
    }
  
    // Validations end

    // Determine Discount Type to be used in functions above.
    let discountType;
    if (document.getElementById("aaa").checked) {
        discountType = "aaa";
    }
    else if (document.getElementById("senior").checked) {
        discountType = "senior";
    }
    else if (document.getElementById("military").checked) {
        discountType = "military";
    }
    else {
        discountType = "noneOfTheAbove";
    }

    // DATE LOGIC
    let checkOutDate;
    //Determine the return date
    checkInDate = new Date(checkInDate);
    //milliseconds per day
    let msec_per_day = 1000 * 60 * 60 * 24;
    //how many milliseconds in days rented
    let msec_per_multidays = (msec_per_day * numNights);
    // add the milliseconds and add 1 day
    checkOutDate = (checkInDate.getTime() + msec_per_multidays + msec_per_day);
    //convert the milliseconds to a regular date
    checkOutDate = new Date(checkOutDate);
    let checkInDateShow = (checkInDate.getTime() + msec_per_day);
    checkInDateShow = new Date(checkInDateShow);
    

    const roomTypeField = document.getElementById("roomType");
    let roomType = roomTypeField.options[roomTypeField.selectedIndex].value;
    // take the roomType, call getRoomInfo, 
    // RETURN the roomInfo data from array.
    let roomInfo = getRoomInfo(roomType);

    // take roomInfo, numAdults, numKids, call canRoomHoldCustomer, 
    // RETURN canRoomHoldCustomerAnswer (true or false)
    let canRoomHoldCustomerAnswer = canRoomHoldCustomer(roomInfo, numAdults, numKids);
    if (canRoomHoldCustomerAnswer == false) {
       return;
    }

    // take roomType, numNights, call getroomCostBeforeDiscount, 
    // RETURN roomCostBeforeDiscount (the cost without any discounts yet)
    let roomCostBeforeDiscount = getroomCostBeforeDiscount(roomInfo, numNights);

    // take numAdults, numKids, numNights, discountType, call getBreakfastCost, 
    // RETURN breakfastCost
    let breakfastCost = getBreakfastCost(numAdults, numKids, numNights, discountType);

    // take roomCostBeforeDiscount, discountType, call getDiscount, 
    // RETURN discountTotal
    let discountTotal = getDiscount(roomCostBeforeDiscount, discountType);

    let totalRoomBreakSubtotal;
    let tax;
    let totalPrice;

    // OUTPUT VALUES     
    document.getElementById("checkInDateShow").value = checkInDateShow.toDateString();
    document.getElementById("checkOutDate").value = checkOutDate.toDateString();

    //Total Room Cost
    totalRoomBreakSubtotal = (roomCostBeforeDiscount + breakfastCost);
    document.getElementById("totalRoomBreakSubtotal").value = totalRoomBreakSubtotal.toFixed(2);
    //Discount
    document.getElementById("discountTotal").value = discountTotal.toFixed(2);
    //Tax
    tax = ((totalRoomBreakSubtotal - discountTotal) * .12);
    document.getElementById("tax").value = tax.toFixed(2);
    //Total Due
    totalPrice = ((totalRoomBreakSubtotal - discountTotal) + tax);
    document.getElementById("totalPrice").value = totalPrice.toFixed(2);
}







