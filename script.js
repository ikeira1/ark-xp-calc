function showSection(id) {
  document.querySelectorAll('.section').forEach(section => section.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

function generateLevels() {
  const maxLevel = parseInt(document.getElementById('maxLevel').value);
  let xp = 5;
  let xpList = [];
  for (let i = 0; i <= maxLevel; i++) {
    xpList.push(`ExperiencePointsForLevel[${i}]=${xp}`);
    xp = Math.round(xp * 1.15);
  }
  document.getElementById('levelOutput').value = `LevelExperienceRampOverrides=(${xpList.join(',')})`;
}

function calculateXP() {
  const input = document.getElementById('xpInput').value;
  const matches = input.match(/ExperiencePointsForLevel\[\d+\]=(\d+)/g);
  if (!matches) {
    document.getElementById('totalXP').innerText = "لم يتم العثور على بيانات XP صحيحة.";
    return;
  }
  let total = matches.reduce((sum, xpLine) => sum + parseInt(xpLine.split('=')[1]), 0);
  document.getElementById('totalXP').innerText = `إجمالي الـ XP: ${total.toLocaleString()}`;
  document.getElementById('xpFinalCodes').value =
    `OverrideMaxExperiencePointsPlayer=70368744177664\nOverrideMaxExperiencePointsPlayer=31904406\nOverrideMaxExperiencePointsDino=2147483647`;
}

function generateEngramCode() {
  const points = document.getElementById('engramPoints').value;
  document.getElementById('engramOutput').value = `OverridePlayerLevelEngramPoints=${points}`;
}

let resources = [];
function addResource() {
  const container = document.getElementById('resourcesContainer');
  const index = resources.length;
  const div = document.createElement('div');
  div.innerHTML = `
    <input type="text" placeholder="ID المورد" id="resID${index}"/>
    <input type="number" placeholder="الكمية" id="resQty${index}" min="1" value="1"/>
    <button onclick="removeResource(this)">❌</button>
  `;
  container.appendChild(div);
  resources.push(index);
}

function removeResource(btn) {
  btn.parentElement.remove();
}

function generateCraftCode() {
  const itemID = document.getElementById('itemID').value;
  let result = `ConfigOverrideItemCraftingCosts=(ItemClassString="${itemID}",BaseCraftingResourceRequirements=[`;
  const container = document.getElementById('resourcesContainer');
  const inputs = container.querySelectorAll('div');
  inputs.forEach((div, i) => {
    const id = div.querySelector(`input[id^="resID"]`).value;
    const qty = div.querySelector(`input[id^="resQty"]`).value;
    result += `(ResourceItemType="${id}",ResourceQuantity=${qty},bCraftingRequireExactResourceType=false)`;
    if (i < inputs.length - 1) result += ',';
  });
  result += "])";
  document.getElementById('craftOutput').value = result;
}
