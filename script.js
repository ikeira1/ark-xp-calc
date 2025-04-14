
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function () {
    document.querySelectorAll(".section").forEach(section => section.classList.remove("active"));
    const sectionId = this.getAttribute("data-section");
    document.getElementById(sectionId).classList.add("active");
  });
});

function copyResult(id) {
  const text = document.getElementById(id).textContent;
  navigator.clipboard.writeText(text);
}

function generateLevels() {
  const count = parseInt(document.getElementById("levelCount").value);
  let xp = 5, result = "LevelExperienceRampOverrides=(";
  for (let i = 0; i <= count; i++) {
    result += `ExperiencePointsForLevel[${i}]=${xp}${i === count ? "" : ","}`;
    xp += Math.floor(1.2 * xp);
  }
  result += ")";
  document.getElementById("levelResult").textContent = result;
}

function calculateXP() {
  const input = document.getElementById("xpInput").value;
  const matches = [...input.matchAll(/ExperiencePointsForLevel\[\d+\]=(\d+)/g)];
  let total = 0;
  matches.forEach(m => total += parseInt(m[1]));
  const result = `OverrideMaxExperiencePointsPlayer=${total}\nOverrideMaxExperiencePointsPlayer=31904406\nOverrideMaxExperiencePointsDino=2147483647`;
  document.getElementById("xpResult").textContent = result;
}

function generateEngrams() {
  const maxLevel = parseInt(document.getElementById("engramsLevel").value);
  let result = "";
  for (let i = 1; i <= maxLevel; i++) {
    result += `OverrideEngramPoints=${i * 5}\n`;
  }
  document.getElementById("engramsResult").textContent = result;
}

function addResourceField() {
  const container = document.getElementById("resourcesContainer");
  const div = document.createElement("div");
  div.className = "resource-field";
  div.innerHTML = `
    <input type="text" placeholder="ID المورد (مثل: PrimalItemResource_Wood_C)" />
    <input type="number" placeholder="الكمية" />
    <button onclick="this.parentElement.remove()">🗑️</button>
  `;
  container.appendChild(div);
}

function generateCraftCode() {
  const itemId = document.getElementById("itemIdInput").value.trim();
  const resourceFields = document.querySelectorAll(".resource-field");
  const resources = [];

  resourceFields.forEach(field => {
    const inputs = field.querySelectorAll("input");
    const id = inputs[0].value.trim();
    const qty = parseFloat(inputs[1].value.trim());
    if (id && qty) {
      resources.push(`(ResourceItemTypeString=\"${id}\",BaseResourceRequirement=${qty},bCraftingRequireExactResourceType=false)`);
    }
  });

  const code = `ConfigOverrideItemCraftingCosts=(ItemClassString=\"${itemId}\",BaseCraftingResourceRequirements=(${resources.join(",")}))`;
  document.getElementById("craftResult").textContent = code;
}
