function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    showSection(this.dataset.section);
  });
});

function generateLevels() {
  const count = parseInt(document.getElementById("levelCount").value);
  if (!count || count < 1) return;

  const result = [];
  for (let i = 0; i <= count; i++) {
    result.push(`ExperiencePointsForLevel[${i}]=${5 + i * i}`);
  }
  const finalCode = `LevelExperienceRampOverrides=(${result.join(",")})`;
  document.getElementById("levelResult").textContent = finalCode;
}

function copyResult(id) {
  const text = document.getElementById(id).textContent;
  navigator.clipboard.writeText(text);
}

function calculateXP() {
  const input = document.getElementById("xpInput").value;
  const matches = [...input.matchAll(/ExperiencePointsForLevel\[\d+\]=(\d+)/g)];
  let totalXP = 0;

  matches.forEach(m => {
    totalXP += parseInt(m[1]);
  });

  const levelCount = matches.length;
  const resultText = `عدد المستويات: ${levelCount}\nالمجموع الكلي للـ XP: ${totalXP}`;
  document.getElementById("xpResult").textContent = resultText;
}

function generateEngrams() {
  const level = parseInt(document.getElementById("engramsLevel").value);
  if (!level || level < 1) return;

  let result = "";
  for (let i = 1; i <= level; i++) {
    result += `OverridePlayerLevelEngramPoints=${i * 10}\n`;
  }
  document.getElementById("engramsResult").textContent = result.trim();
}

// الكرافت
function addResource() {
  const container = document.getElementById("resourcesContainer");
  const row = document.createElement("div");
  row.className = "resource-row";
  row.innerHTML = `
    <input placeholder="ID المورد (مثال: PrimalItemResource_Wood_C)">
    <input type="number" placeholder="الكمية">
    <button onclick="this.parentElement.remove()">❌</button>
  `;
  container.appendChild(row);
}

function generateCraftingCode() {
  const itemId = document.getElementById("craftItemId").value.trim();
  if (!itemId) return;

  const rows = document.querySelectorAll(".resource-row");
  const resources = [];

  rows.forEach(row => {
    const inputs = row.querySelectorAll("input");
    const id = inputs[0].value.trim();
    const amount = parseFloat(inputs[1].value);
    if (id && amount) {
      resources.push(`(ResourceItemTypeString="${id}",BaseResourceRequirement=${amount},bCraftingRequireExactResourceType=false)`);
    }
  });

  const code = `ConfigOverrideItemCraftingCosts=(ItemClassString="${itemId}",BaseCraftingResourceRequirements=(${resources.join(",")}))`;
  document.getElementById("craftingResult").textContent = code;
}
