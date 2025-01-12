const btns = document.querySelector(".btns");
const numberInput = document.querySelector(".number-input");

const operationSigns = ["/", "x", "-", "+", "=", "c", "ac"];

const values = {
  first: 0,
  second:0
};

let operator = "";

function doOperation(n1, n2, op) {
  const operations = {
    "/": (n1, n2) => n1 / n2,
    "x": (n1, n2) => n1 * n2,
    "-": (n1, n2) => n1 - n2,
    "+": (n1, n2) => n1 + n2
  };

  const un1 = parseFloat(n1);
  const un2 = parseFloat(n2);

  return operations[op](un1, un2);
}

btns.addEventListener("click", (e) => {
  const tagName = e.target.tagName;
  const contentText = e.target.textContent;

  if(contentText === "c") {
    numberInput.value = numberInput.value.split("").slice(0, -1).join("");
  }

  if(contentText === "ac") numberInput.value = "";

  if(tagName === "BUTTON" && !operationSigns.includes(contentText)) {
    numberInput.value += contentText;
  }

  if(
    tagName === "BUTTON" && operationSigns.includes(contentText) &&
    contentText !== "=" && contentText !== "c" &&
    contentText !== "ac" && numberInput.value
  ) {
    values.first = numberInput.value;

    numberInput.value = "";

    operator = contentText;
  }

  if(operator && numberInput.value) {
    values.second = numberInput.value;
  }

  if(operator && contentText === "=") {
    numberInput.value = doOperation(values.first, values.second, operator);
  }
});

document.addEventListener("keydown", (e) => {
  if(e.key === "Backspace") {
    numberInput.value = numberInput.value.split("").slice(0, -1).join("");
  }

  if(!isNaN(parseInt(e.key))) numberInput.value += e.key;
});