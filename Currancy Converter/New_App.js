const base_url = "https://v6.exchangerate-api.com/v6/30273b22be2dde14ace8a6ed/pair";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.getElementsByTagName("button"); // Select the specific button
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns with country codes
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.value = currCode;
        newOption.innerText = currCode;

        if (select.name === "from" && currCode === "USD") {
            // newOption.selected = "selected";
            newOption.selected = true;
        } else if (select.name === "to" && currCode === "INR") {
            // newOption.selected = "selected";
            newOption.selected = true;
        }

        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// Function to fetch and update exchange rate
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const url = `${base_url}/${fromcurr.value}/${tocurr.value}`;

    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch exchange rate data");

        let data = await response.json();
        let rate = data.conversion_rate;//converion rate is a field of json file

        let finalAmount = amtVal * rate;
        msg.innerText = `${amtVal} ${fromcurr.value} = ${finalAmount.toFixed(2)} ${tocurr.value}`;
    } catch (error) {
        console.error(error);
        msg.innerText = "Error fetching exchange rate. Please try again.";
    }
};

// Function to update country flags
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};

// Button event listener
btn.addEventListener("click" = (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

// Initialize on page load
window.addEventListener("load", () => {
    updateFlag(fromcurr);
    updateFlag(tocurr);
    updateExchangeRate();
});

// window.onload = () =>{
//     updateExchangeRate();
//     updateFlag(fromcurr);
//     updateFlag(tocurr);
// };