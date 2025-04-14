// تغيير عرض الأقسام
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    const target = this.getAttribute("data-section");
    document.getElementById(target).classList.add("active");
  });
});

// توليد اللفلات
function generateLevels() {
  const count = parseInt(document.getElementById("levelCount").value);
  if (isNaN(count) || count < 1) return;

  let xp = 5;
  let code = "LevelExperienceRampOverrides=(";
  for (let i = 0; i <= count; i++) {
    code += `ExperiencePointsForLevel[${i}]=${Math.floor(xp)},`;
    xp += 5 + Math.floor(i * 1.2);
  }
  code = code.replace(/,+$/, "") + ")";
  document.getElementById("levelResult").textContent = code;
}

function copyResult(id) {
  const text = document.getElementById(id).textContent;
  navigator.clipboard.writeText(text);
}

// حساب XP
function calculateXP() {
  const input = document.getElementById("xpInput").value;
  const matches = input.match(/ExperiencePointsForLevel\[\d+\]=\d+/g);
  if (!matches) return;
  let sum = 0;
  matches.forEach(line => {
    const value = parseInt(line.split("=")[1]);
    sum += value;
  });

  const result = `OverrideMaxExperiencePointsPlayer=70368744177664\nOverrideMaxExperiencePointsPlayer=${sum}\nOverrideMaxExperiencePointsDino=2147483647`;
  document.getElementById("xpResult").textContent = result;
}

// توليد Engrams
function generateEngrams() {
  const level = parseInt(document.getElementById("engramsLevel").value);
  if (isNaN(level) || level < 1) return;
  let result = "";
  for (let i = 1; i <= level; i++) {
    result += `OverridePlayerLevelEngramPoints=${i % 5 === 0 ? 20 : 10}\n`;
  }
  document.getElementById("engramsResult").textContent = result;
}

// كرافت - الموارد
function addResource() {
  const container = document.getElementById("resourcesContainer");
  const div = document.createElement("div");
  div.className = "resource-pair";
  div.innerHTML = `
    <input type="text" placeholder="ID المورد مثل: PrimalItemResource_Wood_C" class="resourceId" />
    <input type="number" placeholder="الكمية" class="resourceAmount" />
    <button onclick="this.parentElement.remove()">X</button>
  `;
  container.appendChild(div);
}

function generateCraftCode() {
  const itemId = document.getElementById("itemIdInput").value;
  if (!itemId) return;

  const ids = document.querySelectorAll(".resourceId");
  const amounts = document.querySelectorAll(".resourceAmount");
  let resources = [];

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i].value;
    const amount = amounts[i].value;
    if (id && amount) {
      resources.push(`(ResourceItemTypeString="${id}",BaseResourceRequirement=${amount},bCraftingRequireExactResourceType=false)`);
    }
  }

  const code = `ConfigOverrideItemCraftingCosts=(ItemClassString="${itemId}",BaseCraftingResourceRequirements=(${resources.join(",")}))`;
  document.getElementById("craftResult").textContent = code;
}

// الستاتس
const stats = [
  "Health (الصحة)", "Stamina (التحمل)", "Torpidity (التخدير)",
  "Oxygen (الأوكسجين)", "Food (الطعام)", "Water (الماء)",
  "Temperature (الحرارة)", "Weight (الوزن)", "Melee Damage (الضربة)",
  "Movement Speed (السرعة)", "Fortitude (التحمل)", "Crafting Skill (التصنيع)"
];

function createStatInputs(containerId, type) {
  const container = document.getElementById(containerId);
  stats.forEach((label, i) => {
    const row = document.createElement("label");
    row.innerHTML = `${label}<input type="number" value="1.0" step="0.01" data-type="${type}" data-index="${i}" />`;
    container.appendChild(row);
  });
}

function generateStatsCode() {
  const inputs = document.querySelectorAll("input[data-type]");
  let result = "";
  ["Player", "DinoTamed", "DinoWild"].forEach(group => {
    inputs.forEach(input => {
      if (input.dataset.type === group) {
        result += `PerLevelStatsMultiplier_${group}[${input.dataset.index}]=${input.value}\n`;
      }
    });
  });
  document.getElementById("statsResult").textContent = result;
}

window.onload = () => {
  createStatInputs("playerStats", "Player");
  createStatInputs("tamedStats", "DinoTamed");
  createStatInputs("wildStats", "DinoWild");
};
