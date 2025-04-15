
function showTool(id) {
  document.querySelectorAll('.tool-section').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}
