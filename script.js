function showSection(sectionId) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");
}
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const section = link.getAttribute("data-section");
    showSection(section);
  });
});

function generateLevels() {
  const levelInput = document.getElementById("levelCount");
  const maxLevel = parseInt(levelInput.value);
  const resultBox = document.getElementById("levelResult");

  if (isNaN(maxLevel) || maxLevel < 1 || maxLevel > 1000) {
    resultBox.textContent = "يرجى إدخال رقم مستوى من 1 إلى 1000";
    return;
  }

  let result = `OverrideMaxExperiencePointsPlayer=70368744177664\n`;
  result += `OverrideMaxExperiencePointsPlayer=31904406\n`;
  result += `OverrideMaxExperiencePointsDino=2147483647\n`;
  result += `LevelExperienceRampOverrides=(\n`;

  for (let i = 0; i <= maxLevel; i++) {
    const xp = i === 0 ? 5 : Math.round(5 + Math.pow(i, 1.6));
    result += `ExperiencePointsForLevel[${i}]=${xp}`;
    if (i !== maxLevel) result += ",\n";
  }
  result += "\n)";

  resultBox.textContent = result;
}

function copyResult(id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text).then(() => alert("تم النسخ"));
}

function calculateXP() {
  const input = document.getElementById("xpInput").value;
  const matches = input.match(/ExperiencePointsForLevel\[\d+\]=(\d+)/g);
  const totalXP = matches ? matches.reduce((sum, m) => sum + parseInt(m.split("=")[1]), 0) : 0;
  document.getElementById("xpResult").textContent = `مجموع XP: ${totalXP}`;
}

function generateEngrams() {
  const level = parseInt(document.getElementById("engramsLevel").value);
  if (isNaN(level) || level < 1) return;
  let result = "";
  for (let i = 0; i <= level; i++) {
    let value = i <= 9 ? 0 : i <= 19 ? 8 : i <= 29 ? 14 : i <= 39 ? 18 : i <= 49 ? 24 : i <= 59 ? 28 : i <= 69 ? 36 : i <= 79 ? 50 : i <= 89 ? 70 : i <= 99 ? 80 : i <= 109 ? 100 : i <= 119 ? 110 : i <= 129 ? 125 : i <= 139 ? 135 : i <= 149 ? 120 : 220;
    result += `OverridePlayerLevelEngramPoints=${value}\n`;
  }
  document.getElementById("engramsResult").textContent = result.trim();
}

// 🔧 CRAFTING SECTION

function addResource() {
  const container = document.getElementById("resourcesContainer");
  const row = document.createElement("div");
  row.className = "resource-row";
  row.innerHTML = `
    <input type="text" placeholder="Resource ID (مثال: PrimalItemResource_Wood_C)" />
    <input type="number" placeholder="الكمية المطلوبة" />
  `;
  container.appendChild(row);
}

function generateCraftingCode() {
  const itemID = document.getElementById("itemID").value.trim();
  const rows = document.querySelectorAll("#resourcesContainer .resource-row");
  if (!itemID || rows.length === 0) return;

  let resources = [];
  rows.forEach(row => {
    const inputs = row.querySelectorAll("input");
    const id = inputs[0].value.trim();
    const qty = inputs[1].value.trim();
    if (id && qty) {
      resources.push(`(ResourceItemTypeString="${id}",BaseResourceRequirement=${qty},bCraftingRequireExactResourceType=false)`);
    }
  });

  const code = `ConfigOverrideItemCraftingCosts=(ItemClassString="${itemID}",BaseCraftingResourceRequirements=(${resources.join(",")}))`;
  document.getElementById("craftResult").textContent = code;
}
