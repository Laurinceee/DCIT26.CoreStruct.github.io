document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
  
      button.classList.add('active');
      const target = document.getElementById(button.dataset.tab);
      target.classList.add('active');
    });
  });
  
  window.toggleOptionsMenu = function (event) {
    const menu = event.target.closest('.card').querySelector('.options-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  };
  
  window.editCard = function (event) {
    const card = event.target.closest('.card');
    alert('Edit functionality to be implemented');
  };
  
  window.deleteCard = function (event) {
    const card = event.target.closest('.card');
    card.remove();
    alert('Card deleted!');
  };
  
  window.toggleMenu = function() {
    alert('Menu toggle functionality to be added');
  };
});
function uploadCourseMaterial(materialName, fileContent) {
  let courseMaterials = JSON.parse(localStorage.getItem('courseMaterials')) || [];
  courseMaterials.push({ name: materialName, content: fileContent });
  localStorage.setItem('courseMaterials', JSON.stringify(courseMaterials));
  alert('Material uploaded successfully!');
}

function downloadCourseMaterial(materialName) {
  let courseMaterials = JSON.parse(localStorage.getItem('courseMaterials')) || [];
  let material = courseMaterials.find(item => item.name === materialName);
  if (material) {
    console.log(`Downloading ${material.name}: ${material.content}`);
  } else {
    alert('Material not found!');
  }
}

uploadCourseMaterial('Math Syllabus', 'Syllabus content goes here...'); 
downloadCourseMaterial('Math Syllabus'); 