// التنقل بين الأقسام
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function () {
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(this.dataset.section).classList.add("active");
  });
});

// توليد اللفلات
function generateLevels() {
  const level = parseInt(document.getElementById("levelCount").value);
  if (isNaN(level) || level < 1) return;

  let result = `LevelExperienceRampOverrides=(`;
  let xp = 5;
  for (let i = 0; i <= level; i++) {
    result += `ExperiencePointsForLevel[${i}]=${xp}`;
    if (i !== level) result += ",";
    xp += Math.floor(xp * 0.15) + 1;
  }
  result += `)`;
  document.getElementById("levelResult").textContent = result;
}

// نسخ
function copyResult(id) {
  const content = document.getElementById(id).textContent;
  navigator.clipboard.writeText(content);
}

// حساب XP
function calculateXP() {
  const input = document.getElementById("xpInput").value;
  const matches = input.match(/ExperiencePointsForLevel\[\d+\]=(\d+)/g);
  if (!matches) return;

  const values = matches.map(m => parseInt(m.split("=")[1]));
  const totalXP = values.reduce((a, b) => a + b, 0);
  const levelCount = values.length;

  const result = `
عدد اللفلات: ${levelCount}
مجموع XP: ${totalXP}

OverrideMaxExperiencePointsPlayer=70368744177664
OverrideMaxExperiencePointsPlayer=${totalXP}
OverrideMaxExperiencePointsDino=2147483647
`;
  document.getElementById("xpResult").textContent = result.trim();
}

// Engrams
function generateEngrams() {
  const lvl = parseInt(document.getElementById("engramsLevel").value);
  if (isNaN(lvl) || lvl < 1) return;

  let result = "";
  for (let i = 1; i <= lvl; i++) {
    result += `OverridePlayerLevelEngramPoints=${i * 5}\n`;
  }
  document.getElementById("engramsResult").textContent = result;
}

// تعديل الكرافت
function addResource() {
  const container = document.getElementById("resourcesContainer");
  const row = document.createElement("div");
  row.className = "resource-row";

  const idInput = document.createElement("input");
  idInput.placeholder = "ID المورد";

  const qtyInput = document.createElement("input");
  qtyInput.type = "number";
  qtyInput.placeholder = "الكمية";

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "❌";
  removeBtn.onclick = () => row.remove();

  row.appendChild(idInput);
  row.appendChild(qtyInput);
  row.appendChild(removeBtn);

  container.appendChild(row);
}

function generateCraftingCode() {
  const itemId = document.getElementById("itemIdInput").value.trim();
  const resources = document.querySelectorAll(".resource-row");

  if (!itemId || resources.length === 0) return;

  let code = `ConfigOverrideItemCraftingCosts=(ItemClassString="${itemId}",BaseCraftingResourceRequirements=(`;

  resources.forEach((row, index) => {
    const id = row.children[0].value.trim();
    const qty = row.children[1].value.trim();
    if (id && qty) {
      code += `(ResourceItemTypeString="${id}",BaseResourceRequirement=${qty},bCraftingRequireExactResourceType=false)`;
      if (index !== resources.length - 1) code += ",";
    }
  });

  code += `))`;
  document.getElementById("craftResult").textContent = code;
}
