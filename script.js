// تنقل بين الأقسام
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function () {
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    const sectionId = this.getAttribute("data-section");
    document.getElementById(sectionId).classList.add("active");
  });
});

// نسخ النتيجة
function copyResult(id) {
  const content = document.getElementById(id).innerText;
  navigator.clipboard.writeText(content).then(() => alert("تم النسخ!"));
}

// توليد لفلات
function generateLevels() {
  const count = parseInt(document.getElementById("levelCount").value || 0);
  let output = `LevelExperienceRampOverrides=(`;
  let xp = 5;
  for (let i = 0; i <= count; i++) {
    output += `ExperiencePointsForLevel[${i}]=${xp}`;
    if (i !== count) output += ",";
    xp += Math.floor(xp * 0.1 + 10);
  }
  output += `)`;
  document.getElementById("levelResult").innerText = output;
}

// حساب XP
function calculateXP() {
  const input = document.getElementById("xpInput").value;
  const regex = /ExperiencePointsForLevel\[\d+\]=(\d+)/g;
  let match, total = 0;

  while ((match = regex.exec(input)) !== null) {
    total += parseInt(match[1]);
  }

  const result = `OverrideMaxExperiencePointsPlayer=70368744177664\nOverrideMaxExperiencePointsPlayer=${total}\nOverrideMaxExperiencePointsDino=${total}`;
  document.getElementById("xpResult").innerText = result;
}

// توليد Engrams
function generateEngrams() {
  const level = parseInt(document.getElementById("engramsLevel").value || 0);
  let output = "";
  for (let i = 0; i <= level; i++) {
    let points = i < 10 ? 0 : i < 20 ? 8 : i < 30 ? 14 : i < 40 ? 18 : i < 50 ? 24 :
                 i < 60 ? 28 : i < 70 ? 36 : i < 80 ? 50 : i < 90 ? 70 : i < 100 ? 80 :
                 i < 110 ? 100 : i < 120 ? 110 : i < 130 ? 125 : i < 140 ? 135 :
                 i < 150 ? 120 : 220;
    output += `OverridePlayerLevelEngramPoints=${points}\n`;
  }
  document.getElementById("engramsResult").innerText = output;
}

// الكرافت اليدوي
function addResourceInput() {
  const container = document.getElementById("resourcesContainer");
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="ID المورد (مثل: PrimalItemResource_Wood_C)" class="resource-id">
    <input type="number" placeholder="الكمية" class="resource-amount" style="margin-right: 10px;">
    <button onclick="this.parentNode.remove()">❌</button>
  `;
  container.appendChild(div);
}

function generateCraftingCode() {
  const itemId = document.getElementById("craftedItemId").value;
  const ids = document.querySelectorAll(".resource-id");
  const amounts = document.querySelectorAll(".resource-amount");

  let requirements = [];
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i].value.trim();
    const amount = parseInt(amounts[i].value.trim());
    if (id && amount > 0) {
      requirements.push(`(ResourceItemTypeString="${id}",BaseResourceRequirement=${amount})`);
    }
  }

  const code = `ConfigOverrideItemCraftingCosts=(ItemClassString="${itemId}",BaseCraftingResourceRequirements=[${requirements.join(",")}])`;
  document.getElementById("craftingResult").innerText = code;
}
