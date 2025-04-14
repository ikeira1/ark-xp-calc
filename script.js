document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = this.getAttribute("data-section");
    document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(target).classList.add("active");
  });
});

function generateLevels() {
  const count = parseInt(document.getElementById("levelCount").value);
  if (!count || count <= 0) return;

  let result = "LevelExperienceRampOverrides=(";
  let total = 5;
  result += `ExperiencePointsForLevel[0]=${total}`;
  for (let i = 1; i <= count; i++) {
    total += 5 + Math.floor(i * 1.1);
    result += `,ExperiencePointsForLevel[${i}]=${total}`;
  }
  result += ")";
  document.getElementById("levelResult").textContent = result;
}

function calculateXP() {
  const input = document.getElementById("xpInput").value;
  const matches = input.match(/ExperiencePointsForLevel\[\d+\]=(\d+)/g);
  let xp = 0;
  let result = "";
  if (matches) {
    matches.forEach(line => {
      const num = parseInt(line.split("=")[1]);
      xp += num;
    });
    result = `OverrideMaxExperiencePointsPlayer=${xp * 2}\nOverrideMaxExperiencePointsPlayer=${xp}\nOverrideMaxExperiencePointsDino=2147483647`;
  } else {
    result = "لم يتم العثور على كود صالح.";
  }
  document.getElementById("xpResult").textContent = result;
}

function generateEngrams() {
  const level = parseInt(document.getElementById("engramsLevel").value);
  if (!level || level <= 0) return;
  const template = [0,8,8,8,8,8,8,8,8,14,14,14,14,14,14,14,14,14,14,18,18,18,18,18,18,18,18,18,18,24,24,24,24,24,24,24,24,24,24,28,28,28,28,28,28,28,28,28,28,36,36,36,36,36,36,36,36,36,36,50,50,50,50,50,50,50,50,50,50,50,50,50,70,70,70,70,70,70,70,70,80,80,80,80,80,80,100,100,100,100,100,110,110,110,110,110,125,125,135,135,135,120,120,220,220,220,220,220,220,220,220,220,220,220,220,220,260,260];
  let result = "";
  for (let i = 0; i < level; i++) {
    const value = template[i] !== undefined ? template[i] : 0;
    result += `OverridePlayerLevelEngramPoints=${value}\n`;
  }
  document.getElementById("engramsResult").textContent = result;
}

function copyResult(id) {
  const content = document.getElementById(id).textContent;
  navigator.clipboard.writeText(content);
}

function searchCraft() {
  const input = document.getElementById("searchCraftInput").value.trim().toLowerCase();
  const resultsDiv = document.getElementById("craftResults");
  resultsDiv.innerHTML = "";

  if (!input) return;

  // مثال يدوي فقط
  if (input.includes("fabricator")) {
    const craftBox = document.createElement("pre");
    craftBox.textContent = `ConfigOverrideItemCraftingCosts=(ItemClassString="PrimalItemStructure_Fabricator_C",BaseCraftingResourceRequirements=((ResourceItemTypeString="PrimalItemResource_MetalIngot_C",BaseResourceRequirement=35.0,bCraftingRequireExactResourceType=false),(ResourceItemTypeString="PrimalItemResource_Sparkpowder_C",BaseResourceRequirement=20.0,bCraftingRequireExactResourceType=false),(ResourceItemTypeString="PrimalItemResource_Crystal_C",BaseResourceRequirement=25.0,bCraftingRequireExactResourceType=false),(ResourceItemTypeString="PrimalItemResource_Oil_C",BaseResourceRequirement=10.0,bCraftingRequireExactResourceType=false),(ResourceItemTypeString="PrimalItemResource_Electronics_C",BaseResourceRequirement=15.0,bCraftingRequireExactResourceType=false)))`;
    resultsDiv.appendChild(craftBox);
  } else {
    resultsDiv.textContent = "لم يتم العثور على نتائج.";
  }
}
