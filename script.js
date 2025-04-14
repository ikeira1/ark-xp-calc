function showSection(id) {
  document.querySelectorAll('.tool-section').forEach(sec => sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

// توليد كود اللفلات
function generateLevels() {
  const max = parseInt(document.getElementById("maxLevel").value);
  let output = "LevelExperienceRampOverrides=(";
  let xp = 5;
  for (let i = 0; i <= max; i++) {
    if (i === 0) {
      output += `ExperiencePointsForLevel[${i}]=${xp}`;
    } else {
      xp += Math.floor(i * 1.1 + 1);
      output += `,ExperiencePointsForLevel[${i}]=${xp}`;
    }
  }
  output += ")";
  document.getElementById("levelOutput").value = output;
}

// حساب XP
function generateXP() {
  const max = parseInt(document.getElementById("xpLevel").value);
  let xpList = [];
  let xp = 5;
  let total = 5;
  for (let i = 1; i <= max; i++) {
    xp += Math.floor(i * 1.1 + 1);
    xpList.push(xp);
    total += xp;
  }

  const result = 
`OverrideMaxExperiencePointsPlayer=70368744177664
OverrideMaxExperiencePointsPlayer=${total}
OverrideMaxExperiencePointsDino=2147483647`;
  document.getElementById("xpOutput").value = result;
}

// توليد Engrams
function generateEngrams() {
  const points = parseInt(document.getElementById("engramPoints").value);
  const code = `OverrideMaxEngramPoints=(${Array(100).fill(points).join(',')})`;
  document.getElementById("engramsOutput").value = code;
}

// تعديل الكرافت
let resourceIndex = 0;
function addResource() {
  const container = document.getElementById("resources");
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="ID المادة" class="res-id" />
    <input type="number" placeholder="الكمية" class="res-amount" />
    <button onclick="this.parentElement.remove()">❌</button>
  `;
  container.appendChild(div);
}

function generateCraftCode() {
  const itemID = document.getElementById("itemID").value.trim();
  const ids = document.querySelectorAll(".res-id");
  const amounts = document.querySelectorAll(".res-amount");

  let code = `ConfigOverrideItemCraftingCosts=(ItemClassString="${itemID}",BaseCraftingResourceRequirements=(`;
  for (let i = 0; i < ids.length; i++) {
    if (i > 0) code += ",";
    code += `(ResourceItemTypeString="${ids[i].value}",BaseResourceRequirement=${amounts[i].value},bCraftingRequireExactResourceType=false)`;
  }
  code += "))";
  document.getElementById("craftOutput").value = code;
}
