// التنقل بين الأقسام
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    const target = this.getAttribute("data-section");
    document.getElementById(target).classList.add("active");
  });
});

// نسخ النتيجة
function copyResult(id) {
  const content = document.getElementById(id).innerText;
  navigator.clipboard.writeText(content);
}

// توليد اللفلات
function generateLevels() {
  const count = parseInt(document.getElementById("levelCount").value);
  if (!count || count < 1 || count > 1000) return;

  let result = `LevelExperienceRampOverrides=(ExperiencePointsForLevel[0]=5`;
  let xp = 5;
  for (let i = 1; i <= count; i++) {
    xp += Math.floor(1.1 * i) + 1;
    result += `,ExperiencePointsForLevel[${i}]=${xp}`;
  }
  result += `)`;

  document.getElementById("levelResult").innerText = result;
}

// حساب XP
function calculateXP() {
  const input = document.getElementById("xpInput").value;
  const matches = input.match(/ExperiencePointsForLevel\[\d+\]=(\d+)/g);
  if (!matches) return;

  let total = 0;
  matches.forEach(m => {
    total += parseInt(m.split('=')[1]);
  });

  const result = `
OverrideMaxExperiencePointsPlayer=70368744177664
OverrideMaxExperiencePointsPlayer=${total}
OverrideMaxExperiencePointsDino=2147483647`;

  document.getElementById("xpResult").innerText = result.trim();
}

// توليد Engrams
function generateEngrams() {
  const level = parseInt(document.getElementById("engramsLevel").value);
  if (!level || level < 1 || level > 1000) return;

  let output = "";
  for (let i = 0; i <= level; i++) {
    const points =
      i >= 125 ? 220 :
      i >= 100 ? 100 :
      i >= 70 ? 70 :
      i >= 50 ? 50 :
      i >= 40 ? 36 :
      i >= 30 ? 28 :
      i >= 20 ? 24 :
      i >= 10 ? 14 : 8;

    output += `OverridePlayerLevelEngramPoints=${points}\n`;
  }

  document.getElementById("engramsResult").innerText = output.trim();
}

// كرافت
function addResource() {
  const container = document.getElementById("resourcesContainer");
  const entry = document.createElement("div");
  entry.className = "resource-entry";

  entry.innerHTML = `
    <input type="text" placeholder="ID المورد (مثل: PrimalItemResource_Wood_C)" />
    <input type="number" placeholder="الكمية" />
    <button onclick="this.parentElement.remove()">❌</button>
  `;
  container.appendChild(entry);
}

function generateCraftingCode() {
  const itemID = document.getElementById("itemID").value.trim();
  if (!itemID) return;

  const entries = document.querySelectorAll("#resourcesContainer .resource-entry");
  const resources = [];

  entries.forEach(entry => {
    const id = entry.children[0].value.trim();
    const qty = entry.children[1].value.trim();
    if (id && qty) {
      resources.push(`(ResourceItemTypeString="${id}",BaseResourceRequirement=${qty},bCraftingRequireExactResourceType=false)`);
    }
  });

  const finalCode = `ConfigOverrideItemCraftingCosts=(ItemClassString="${itemID}",BaseCraftingResourceRequirements=(${resources.join(",")}))`;
  document.getElementById("craftResult").innerText = finalCode;
}
