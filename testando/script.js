const generateButton = document.querySelector("#generate-button");
const colorsDiv = document.querySelector(".colors");
const baseColorInput = document.querySelector("#base-color");

generateButton.addEventListener("click", generateColors);

function generateColors() {
  colorsDiv.innerHTML = "";
  const baseColor = baseColorInput.value;

  for (let i = 0; i < 5; i++) {
    const color = generateRandomColorNear(baseColor);
    const colorDiv = document.createElement("div");
    colorDiv.style.backgroundColor = color;

    const colorName = document.createElement("p");
    colorName.innerText = color;

    const textColor = isLightColor(color) ? "#000" : "#fff";
    colorName.style.color = textColor;

    colorDiv.appendChild(colorName);
    colorsDiv.appendChild(colorDiv);

    colorDiv.addEventListener("click", () => {
      navigator.clipboard.writeText(color).then(() => {
        alert(`Cor ${color} copiada para a área de transferência!`);
      });
    });
  }
}

function generateRandomColorNear(baseColor) {
  const r = parseInt(baseColor.slice(1, 3), 16);
  const g = parseInt(baseColor.slice(3, 5), 16);
  const b = parseInt(baseColor.slice(5, 7), 16);

  const variation = () => Math.floor(Math.random() * 80 - 40);
  const newR = clamp(r + variation(), 0, 255);
  const newG = clamp(g + variation(), 0, 255);
  const newB = clamp(b + variation(), 0, 255);

  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}

function toHex(val) {
  return val.toString(16).padStart(2, "0");
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function isLightColor(hex) {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150;
}




            