function switchSection(target) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(target).classList.add("active");
}

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = link.getAttribute("data-section");
    switchSection(target);
  });
});

function generateLevels() {
  const levelCount = parseInt(document.getElementById("levelCount").value);
  if (isNaN(levelCount) || levelCount <= 0) return;

  let result = `LevelExperienceRampOverrides=(ExperiencePointsForLevel[0]=5`;
  let xp = 5;
  for (let i = 1; i <= levelCount; i++) {
    xp += Math.floor(i * 1.1 + 1);
    result += `,ExperiencePointsForLevel[${i}]=${xp}`;
  }
  result += ")";
  document.getElementById("levelResult").textContent = result;
}

function calculateXP() {
  const input = document.getElementById("xpInput").value;
  const matches = [...input.matchAll(/ExperiencePointsForLevel\[\d+\]=(\d+)/g)];
  const total = matches.reduce((sum, m) => sum + parseInt(m[1]), 0);

  const playerCap = 70368744177664;
  const lastXP = matches[matches.length - 1]?.[1] || 0;
  const dinoCap = 2147483647;

  const output = `OverrideMaxExperiencePointsPlayer=${playerCap}\nOverrideMaxExperiencePointsPlayer=${lastXP}\nOverrideMaxExperiencePointsDino=${dinoCap}`;
  document.getElementById("xpResult").textContent = output;
}

function generateEngrams() {
  const level = parseInt(document.getElementById("engramsLevel").value);
  if (isNaN(level) || level <= 0) return;

  let result = "";
  for (let i = 1; i <= level; i++) {
    result += `OverridePlayerLevelEngramPoints=${i * 10}\n`;
  }
  document.getElementById("engramsResult").textContent = result;
}

function copyResult(id) {
  const text = document.getElementById(id).textContent;
  navigator.clipboard.writeText(text);
}

// كرافت
function addResource() {
  const container = document.getElementById("resourcesContainer");
  const div = document.createElement("div");
  div.className = "resource-input";
  div.innerHTML = `
    <input type="text" placeholder="ID المورد (مثل: PrimalItemResource_Wood_C)" class="res-id"/>
    <input type="number" placeholder="الكمية" class="res-count"/>
    <button onclick="this.parentElement.remove()">❌</button>
  `;
  container.appendChild(div);
}

function generateCraftingCode() {
  const mainId = document.getElementById("mainItemId").value;
  if (!mainId) return;

  const resourceInputs = document.querySelectorAll(".resource-input");
  let resources = [];

  resourceInputs.forEach(div => {
    const id = div.querySelector(".res-id").value.trim();
    const count = parseFloat(div.querySelector(".res-count").value.trim());
    if (id && !isNaN(count)) {
      resources.push(`(ResourceItemTypeString="${id}",BaseResourceRequirement=${count},bCraftingRequireExactResourceType=false)`);
    }
  });

  const result = `ConfigOverrideItemCraftingCosts=(ItemClassString="${mainId}",BaseCraftingResourceRequirements=(${resources.join(",")}))`;
  document.getElementById("craftingResult").textContent = result;
}
