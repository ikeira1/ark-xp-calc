document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function () {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    const target = this.getAttribute('data-section');
    document.getElementById(target).classList.add('active');
  });
});

function generateLevels() {
  const count = parseInt(document.getElementById("levelCount").value);
  let code = `LevelExperienceRampOverrides=(ExperiencePointsForLevel[0]=1`;
  let xp = 1;
  for (let i = 1; i <= count; i++) {
    xp += Math.floor(i * 10 + 50);
    code += `,ExperiencePointsForLevel[${i}]=${xp}`;
  }
  code += ")";
  document.getElementById("levelResult").textContent = code;
}

function calculateXP() {
  const input = document.getElementById("xpInput").value;
  const matches = input.match(/ExperiencePointsForLevel\[\d+\]=(\d+)/g);
  let sum = 0;
  if (matches) {
    sum = matches.reduce((acc, item) => acc + parseInt(item.split("=")[1]), 0);
  }
  document.getElementById("xpResult").textContent =
    `OverrideMaxExperiencePointsPlayer=70368744177664\nOverrideMaxExperiencePointsPlayer=${sum}\nOverrideMaxExperiencePointsDino=${sum}`;
}

function generateEngrams() {
  const level = parseInt(document.getElementById("engramsLevel").value);
  let result = "";
  const map = [0, 8, 14, 18, 24, 28, 36, 50, 70, 80, 100, 110, 125, 135, 120, 220, 260];
  for (let i = 0; i <= level; i++) {
    let val = 0;
    if (i <= 9) val = 8;
    else if (i <= 19) val = 14;
    else if (i <= 29) val = 18;
    else if (i <= 39) val = 24;
    else if (i <= 49) val = 28;
    else if (i <= 59) val = 36;
    else if (i <= 71) val = 50;
    else if (i <= 79) val = 70;
    else if (i <= 85) val = 80;
    else if (i <= 90) val = 100;
    else if (i <= 95) val = 110;
    else if (i <= 97) val = 125;
    else if (i <= 99) val = 135;
    else if (i <= 101) val = 120;
    else val = 220;
    result += `OverridePlayerLevelEngramPoints=${val}\n`;
  }
  document.getElementById("engramsResult").textContent = result;
}

function copyResult(id) {
  const text = document.getElementById(id).textContent;
  navigator.clipboard.writeText(text);
}

function searchCraft() {
  const name = document.getElementById("searchCraftInput").value;
  if (!name) return;
  const itemId = name.toLowerCase().replace(/\s+/g, "_") + "_c";
  const baseID = `ConfigOverrideItemCraftingCosts=(ItemClassString="${itemId}",BaseCraftingResourceRequirements=[`;
  const example = [
    { id: "PrimalItemResource_Wood_C", qty: 35 },
    { id: "PrimalItemResource_MetalIngot_C", qty: 20 }
  ];

  let fields = example.map((e, index) => {
    return `
      <div class="resource-row">
        <input placeholder="Resource ID" value="${e.id}">
        <input type="number" value="${e.qty}">
      </div>
    `;
  }).join("");

  fields += `
    <button onclick="addResource()">➕ إضافة مورد</button>
    <button onclick="generateCraftCode('${itemId}')">🎯 توليد الكود</button>
    <pre id="finalCraftCode"></pre>
  `;

  document.getElementById("craftResults").innerHTML = fields;
}

function addResource() {
  const div = document.createElement("div");
  div.className = "resource-row";
  div.innerHTML = `<input placeholder="Resource ID"><input type="number" value="1">`;
  document.getElementById("craftResults").insertBefore(div, document.querySelector("#craftResults button"));
}

function generateCraftCode(itemId) {
  const inputs = document.querySelectorAll("#craftResults .resource-row");
  let parts = [];
  inputs.forEach(row => {
    const id = row.children[0].value;
    const qty = parseInt(row.children[1].value);
    if (id && qty > 0) {
      parts.push(`(ResourceItemTypeString="${id}",BaseResourceRequirement=${qty})`);
    }
  });
  const finalCode = `ConfigOverrideItemCraftingCosts=(ItemClassString="${itemId}",BaseCraftingResourceRequirements=[${parts.join(",")}])`;
  document.getElementById("finalCraftCode").textContent = finalCode;
}
