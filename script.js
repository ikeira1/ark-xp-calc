// التنقل بين الأقسام
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    document.getElementById(this.dataset.section).classList.add("active");
  });
});

function generateLevels() {
  const count = parseInt(document.getElementById("levelCount").value);
  const result = [];
  result.push("LevelExperienceRampOverrides=(");
  for (let i = 0; i <= count; i++) {
    const xp = i === 0 ? 5 : Math.floor((i ** 1.5) + 5);
    result.push(`ExperiencePointsForLevel[${i}]=${xp}`);
  }
  result.push(")");
  document.getElementById("levelResult").textContent = result.join(",");
}

function calculateXP() {
  const input = document.getElementById("xpInput").value;
  const matches = input.match(/ExperiencePointsForLevel\[\d+\]=(\d+)/g);
  let total = 0;
  if (matches) {
    matches.forEach(line => {
      const val = parseInt(line.split("=")[1]);
      total += val;
    });
  }
  const output = [
    "OverrideMaxExperiencePointsPlayer=70368744177664",
    `OverrideMaxExperiencePointsPlayer=${total}`,
    "OverrideMaxExperiencePointsDino=2147483647"
  ];
  document.getElementById("xpResult").textContent = output.join("\n");
}

function generateEngrams() {
  const level = parseInt(document.getElementById("engramsLevel").value);
  const lines = [];
  for (let i = 0; i <= level; i++) {
    const points =
      i === 0 ? 0 :
      i <= 9 ? 8 :
      i <= 19 ? 14 :
      i <= 29 ? 18 :
      i <= 39 ? 24 :
      i <= 49 ? 28 :
      i <= 59 ? 36 :
      i <= 72 ? 50 :
      i <= 80 ? 70 :
      i <= 86 ? 80 :
      i <= 90 ? 100 :
      i <= 95 ? 110 :
      i <= 100 ? 125 :
      i <= 105 ? 135 :
      i <= 110 ? 120 :
      i <= 120 ? 220 :
      260;
    lines.push(`OverridePlayerLevelEngramPoints=${points}`);
  }
  document.getElementById("engramsResult").textContent = lines.join("\n");
}

// --- الكرافت ---

function addResourceRow() {
  const container = document.getElementById("resourcesContainer");
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="ID المورد (مثال: PrimalItemResource_Wood_C)" class="res-id"/>
    <input type="number" placeholder="الكمية" class="res-amount"/>
    <button onclick="this.parentNode.remove()">❌ حذف</button>
  `;
  container.appendChild(div);
}

function generateCraftingCode() {
  const itemID = document.getElementById("itemID").value.trim();
  const resourceIDs = document.querySelectorAll(".res-id");
  const resourceAmounts = document.querySelectorAll(".res-amount");
  const parts = [];

  for (let i = 0; i < resourceIDs.length; i++) {
    const id = resourceIDs[i].value.trim();
    const amount = parseFloat(resourceAmounts[i].value.trim());
    if (id && amount > 0) {
      parts.push(`(ResourceItemTypeString="${id}",BaseResourceRequirement=${amount},bCraftingRequireExactResourceType=false)`);
    }
  }

  const final = `ConfigOverrideItemCraftingCosts=(ItemClassString="${itemID}",BaseCraftingResourceRequirements=(${parts.join(",")}))`;
  document.getElementById("craftingResult").textContent = final;
}

function copyResult(id) {
  const content = document.getElementById(id).textContent;
  navigator.clipboard.writeText(content).then(() => alert("✅ تم النسخ"));
}
