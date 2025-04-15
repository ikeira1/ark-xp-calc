
function showSection(id) {
    const sections = document.querySelectorAll('.tool-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(id).style.display = 'block';
}

// Default to first section
window.onload = () => {
    showSection('levels');
};
