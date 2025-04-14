document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(e.target.dataset.section).classList.add("active");
  });
});

function copyResult(id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text);
}

function generateLevels() {
  const count = parseInt(document.getElementById("levelCount").value);
  let result = "";
  for (let i = 1; i <= count; i++) {
    result += `ExperiencePointsForLevel[${i}]=${(i * i * 5) + 5}\n`;
  }
  document.getElementById("levelResult").textContent = result.trim();
}

function calculateXP() {
  const input = document.getElementById("xpInput").value;
  const regex = /ExperiencePointsForLevel\[\d+\]=(\d+)/g;
  let total = 0, match;
  while ((match = regex.exec(input)) !== null) {
    total += parseInt(match[1]);
  }

  const output = `OverrideMaxExperiencePointsPlayer=70368744177664\nOverrideMaxExperiencePointsPlayer=${total}\nOverrideMaxExperiencePointsDino=${total}`;
  document.getElementById("xpResult").textContent = output;
}

function generateEngrams() {
  const lvl = parseInt(document.getElementById("engramsLevel").value);
  const points = [];
  for (let i = 0; i <= lvl; i++) {
    if (i <= 9) points.push(0);
    else if (i <= 19) points.push(8);
    else if (i <= 29) points.push(14);
    else if (i <= 39) points.push(18);
    else if (i <= 49) points.push(24);
    else if (i <= 59) points.push(28);
    else if (i <= 69) points.push(36);
    else if (i <= 82) points.push(50);
    else if (i <= 89) points.push(70);
    else if (i <= 95) points.push(80);
    else if (i <= 99) points.push(100);
    else if (i <= 104) points.push(110);
    else if (i <= 106) points.push(125);
    else if (i <= 108) points.push(135);
    else if (i <= 110) points.push(120);
    else points.push(220);
  }
  document.getElementById("engramsResult").textContent = points.map(p => `OverridePlayerLevelEngramPoints=${p}`).join("\n");
}

function addResource() {
  const container = document.getElementById("resourcesContainer");
  const div = document.createElement("div");
  div.className = "resource-entry";
  div.innerHTML = `
    <input placeholder="ID المورد (مثل PrimalItemResource_Wood_C)" />
    <input type="number" placeholder="الكمية" />
    <button onclick="this.parentElement.remove()">🗑️</button>
  `;
  container.appendChild(div);
}

function generateCraftingCode() {
  const itemId = document.getElementById("craftItemId").value.trim();
  const resources = Array.from(document.querySelectorAll("#resourcesContainer .resource-entry")).map(div => {
    const inputs = div.querySelectorAll("input");
    const id = inputs[0].value.trim();
    const qty = parseFloat(inputs[1].value);
    return `(ResourceItemTypeString="${id}",BaseResourceRequirement=${qty},bCraftingRequireExactResourceType=false)`;
  });

  const code = `ConfigOverrideItemCraftingCosts=(ItemClassString="${itemId}",BaseCraftingResourceRequirements=(${resources.join(",")}))`;
  document.getElementById("craftingResult").textContent = code;
}
