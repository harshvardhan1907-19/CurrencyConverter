// const base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr";
// const base_url = "https://v6.exchangerate-api.com/v6/30273b22be2dde14ace8a6ed/latest/USD";
let base_url =
  "https://v6.exchangerate-api.com/v6/30273b22be2dde14ace8a6ed/pair";

let dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.getElementById("btn");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");
let con = document.querySelector("#con");
let fromFlag = document.querySelector("#fro");
let toFlag = document.querySelector("#too");
let fromImg = document.querySelector(".from img");
let toImg = document.querySelector(".to img");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name == "from" && currCode == "USD") {
      newOption.selected = "selected";
    } else if (select.name == "to" && currCode == "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  
}

fromFlag.addEventListener("change", () => {
  updateFromFlag();
});
toFlag.addEventListener("change", () => {
  updateToFlag();
});


let img1, img2;

function updateFromFlag() {
  const FromcurrCode = fromcurr.value;
  const FromcountryCode = countryList[FromcurrCode];
  fromImg.src = `https://flagsapi.com/${FromcountryCode}/flat/64.png`;
}

function updateToFlag() {
  let TocurrCode = tocurr.value;
  const TocountryCode = countryList[TocurrCode];
  toImg.src = `https://flagsapi.com/${TocountryCode}/flat/64.png`;
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if (amtVal == "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const url = `${base_url}/${fromcurr.value}/${tocurr.value}`;
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch exchange rate data");

    let data = await response.json();
    let rate = data.conversion_rate; //[tocurr.value.toLoweCase()]

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromcurr.value} = ${finalAmount.toFixed(2)} ${tocurr.value}`;
  } catch (error) {
    console.error(error);
    msg.innerText = "Error fetching exchange rate. Please try again.";
  }
};

con.addEventListener("click", () => {

  [fromcurr.value, tocurr.value] = [tocurr.value, fromcurr.value];

  updateFromFlag();
  updateToFlag();

  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});

// btn.addEventListener("click", (evt) => {
//   evt.preventDefault();
//   updateExchangeRate();
// });

document.addEventListener("DOMContentLoaded", () => {
  if (!btn) {
    console.error("Button not found! Check your HTML or selector.");
    return;
  }

  btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    console.log("Button clicked! Calling updateExchangeRate...");
    try {
      updateExchangeRate();
    } catch (error) {
      console.error("Error in updateExchangeRate:", error);
    }
  });
});