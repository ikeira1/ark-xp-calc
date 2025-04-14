document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelectorAll(".section").forEach(section => section.classList.remove("active"));
    const sectionId = link.getAttribute("data-section");
    document.getElementById(sectionId).classList.add("active");
  });
});

function copyResult(id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text).then(() => alert("تم نسخ الكود!"));
}

function generateLevels() {
  const maxLevel = parseInt(document.getElementById("levelCount").value);
  const resultBox = document.getElementById("levelResult");
  if (isNaN(maxLevel) || maxLevel < 1 || maxLevel > 1000) {
    resultBox.textContent = "يرجى إدخال رقم مستوى من 1 إلى 1000";
    return;
  }

  let levels = [];
  for (let i = 0; i <= maxLevel; i++) {
    const xp = i === 0 ? 5 : Math.round(5 + Math.pow(i, 1.6));
    levels.push(`ExperiencePointsForLevel[${i}]=${xp}`);
  }
  resultBox.textContent = `LevelExperienceRampOverrides=(${levels.join(",")})`;
}

function calculateXP() {
  const input = document.getElementById("xpInput").value;
  const regex = /ExperiencePointsForLevel\[\d+\]=(\d+)/g;
  let match, total = 0;
  while ((match = regex.exec(input)) !== null) {
    total = parseInt(match[1]);
  }

  let result = "";
  result += `OverrideMaxExperiencePointsPlayer=70368744177664\n`;
  result += `OverrideMaxExperiencePointsPlayer=${total}\n`;
  result += `OverrideMaxExperiencePointsDino=2147483647`;

  document.getElementById("xpResult").textContent = result;
}

function generateEngrams() {
  const level = parseInt(document.getElementById("engramsLevel").value);
  const result = [];
  for (let i = 0; i <= level; i++) {
    let points = 0;
    if (i <= 9) points = 0;
    else if (i <= 19) points = 14;
    else if (i <= 29) points = 18;
    else if (i <= 39) points = 24;
    else if (i <= 49) points = 28;
    else if (i <= 59) points = 36;
    else if (i <= 69) points = 50;
    else if (i <= 79) points = 70;
    else if (i <= 89) points = 80;
    else if (i <= 99) points = 100;
    else if (i <= 109) points = 110;
    else if (i <= 119) points = 125;
    else if (i <= 129) points = 135;
    else if (i <= 139) points = 120;
    else points = 220;
    result.push(`OverridePlayerLevelEngramPoints=${points}`);
  }
  document.getElementById("engramsResult").textContent = result.join("\n");
}

function addResourceField() {
  const container = document.getElementById("resourceList");
  const div = document.createElement("div");
  div.innerHTML = `
    <input placeholder="ID المورد (مثال: PrimalItemResource_MetalIngot_C)" />
    <input type="number" placeholder="الكمية المطلوبة" style="width:100px;" />
    <button onclick="this.parentElement.remove()">❌</button>
  `;
  container.appendChild(div);
}

function generateCraftCode() {
  const itemID = document.getElementById("craftItemID").value.trim();
  const resourceDivs = document.querySelectorAll("#resourceList div");
  const requirements = [];

  resourceDivs.forEach(div => {
    const inputs = div.querySelectorAll("input");
    const id = inputs[0].value.trim();
    const qty = inputs[1].value.trim();
    if (id && qty) {
      requirements.push(`(ResourceItemTypeString="${id}",BaseResourceRequirement=${qty},bCraftingRequireExactResourceType=false)`);
    }
  });

  const code = `ConfigOverrideItemCraftingCosts=(ItemClassString="${itemID}",BaseCraftingResourceRequirements=(${requirements.join(",")}))`;
  document.getElementById("craftResult").textContent = code;
}
