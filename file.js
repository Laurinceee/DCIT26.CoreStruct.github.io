document.getElementById('upload-btn').addEventListener('click', () => {
    document.getElementById('upload-modal').style.display = 'flex';
});
  
document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('upload-modal').style.display = 'none';
});
document.getElementById('submit-upload').addEventListener('click', () => {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    if (file) {
        const fileName = file.name;
        const fileSize = file.size;
        const fileDateCreated = new Date().toLocaleString();
        const fileDateModified = new Date().toLocaleString();
        const modifiedBy = "User";
  
        let files = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
        files.push({ fileName, fileSize, fileDateCreated, fileDateModified, modifiedBy });
        localStorage.setItem('uploadedFiles', JSON.stringify(files));
  
        addFileToTable({ fileName, fileSize, fileDateCreated, fileDateModified, modifiedBy });
  
        document.getElementById('upload-modal').style.display = 'none';
    }
});
  
function addFileToTable(file) {
    const tbody = document.querySelector('#file-table tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${file.fileName}</td>
      <td>${file.fileDateCreated}</td>
      <td>${file.fileDateModified}</td>
      <td>${file.modifiedBy}</td>
      <td>${(file.fileSize / 1024).toFixed(2)} KB</td>
      <td><button class="delete-btn">Delete</button></td>
    `;
    tbody.appendChild(row);

    row.querySelector('.delete-btn').addEventListener('click', () => {
        deleteFile(file);
    });
}
  
function deleteFile(file) {
    let files = JSON.parse(localStorage.getItem('uploadedFiles')) || [];

    files = files.filter(f => f.fileName !== file.fileName);

    localStorage.setItem('uploadedFiles', JSON.stringify(files));

    const rows = document.querySelectorAll('#file-table tbody tr');
    rows.forEach(row => {
        if (row.children[0].textContent === file.fileName) {
            row.remove();
        }
    });
}
  
window.addEventListener('load', () => {
    const files = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    files.forEach(file => addFileToTable(file));
});