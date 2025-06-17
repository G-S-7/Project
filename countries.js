const url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";
const selects= document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const from = document.querySelector(".from select");
const to = document.querySelector(".to select");
const msg = document.querySelector(".msg");
for(let sel of selects){
    for(code in countryList){
        let newOpt = document.createElement("option");
        newOpt.innerText = code;
        newOpt.value=code;
        if(sel.name==="from" && code==="usd"){
            newOpt.selected=true;
        }else if(sel.name==="to" && code==="inr"){
            newOpt.selected=true;
        }sel.append(newOpt);
    }
}

const updateExchangeRate = async ()=> {
    let amt = document.querySelector(".amount input");
    amtval = amt.value;
    if(amtval===""||amtval<1){
        amtval = 1;
        amt.value = "1";
    }

    const url1 = `${url}/${from.value}.json`;
    let response = await fetch(url1);
    let data = await response.json();
    let rate = data[from.value][to.value];
    let finalamt = amtval*rate;
    msg.innerText = `${amtval} ${from.value.toUpperCase()} = ${finalamt.toFixed(4)} ${to.value.toUpperCase()}`;
};

button.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
} );

window.addEventListener("load", () => {
  updateExchangeRate();
});
