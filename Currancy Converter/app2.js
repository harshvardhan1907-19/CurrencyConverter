var base_url = "https://v6.exchangerate-api.com/v6/30273b22be2dde14ace8a6ed/pair";

var dropdown = document.querySelectorAll(".drp-only select");
var msg = document.querySelector(".msg");
var btn = document.querySelector("#btn");
var fromcurr = document.querySelector(".from select");
var tocurr = document.querySelector(".to select");

for (const drp of dropdown) {
    for (const currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.value = currCode;
        newOption.innerHTML = currCode;

        if (drp.name === "from" && currCode === "USD") {
            // newOption.selected = true;
            newOption.selected = "selected";
        } else if (drp.name === "to" && currCode === "INR") {
            newOption.selected = true;
        } 
        
        drp.append(newOption);
    }
    drp.addEventListener("change" ,(evt)=>{
        updateFlag(evt.target);
    });
};

const updateExchangeRate = async() => {
    let amount = document.querySelector(".amount input");
    // let amtval = amount.value;

    // if (amtval === "" || amtval < 1) {
    //     amtval = 1;
    //     amount.value = "1";
    // }

    let amtval = parseFloat(amount.value);
    if (isNaN(amtval) || amtval < 1) {
    amtval = 1;
    amount.value = "1";
}

    const url = `${base_url}/${fromcurr.value}/${tocurr.value}`;

    // try {
    //     let response = await fetch(url);
    //     if (!response.ok) throw new Error("Failed to fetch exchange rate data");

    //     let data = await response.json();
    //     let rate = data.conversion_rate;

    //     let finalval = amtval * rate;
    //     msg.innerText = `${amtval} ${fromcurr.value} = ${finalval} ${tocurr.value}`
    // } catch (error) {
    //     console.error(error);
    //     msg.innerText = "Error fetching exchange rate. Please try again.";
    // }

    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Server Error: ${response.status}`);
        }
        let data = await response.json();
        let rate = data.conversion_rate;
        let finalval = amtval * rate;
        msg.innerText = `${amtval} ${fromcurr.value} = ${finalval.toFixed(2)} ${tocurr.value}`;
    } catch (error) {
        console.error("Error fetching data:", error.message);
        msg.innerText = "Error fetching exchange rate. Please try again.";
    }
    
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};

btn.addEventListener("click",(evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

// window.onload = () =>{
//     updateExchangeRate();
//     updateFlag(fromcurr);
//     updateFlag(tocurr);
//     // updateExchangeRate();
// };

window.addEventListener("load", () => {
    updateFlag(fromcurr);
    updateFlag(tocurr);
    updateExchangeRate();
});
