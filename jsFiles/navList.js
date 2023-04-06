// function addRow() {
//     let table = document.getElementById("myTable");
//     let row = table.insertRow(table.rows.length);
//     let cell1 = row.insertCell(0);
//     let cell2 = row.insertCell(1);
//     let cell3 = row.insertCell(2);
//     let cell4 = row.insertCell(3);
//     let cell5 = row.insertCell(4);
//     let cell6 = row.insertCell(5);
//     let cell7 = row.insertCell(6);
//     cell1.innerHTML = '<input type= "checkbox">';
//     cell2.innerHTML = "Dzyba Vitalka";
//     cell3.innerHTML = "PZ-24";
//     cell4.innerHTML = "M";
//     cell5.innerHTML = "22.06.2004";
//     cell6.innerHTML = '<input type= "radio" checked="checked"/>';
//     cell7.innerHTML = '<button onclick="deleteStudent(this)"> <span class="glyphicon glyphicon-trash"></span> </button><button><span class="glyphicon glyphicon-pencil"></span></button>';
//     closeForm();
// }
// function deleteStudent(button) {
//     let row = button.parentNode.parentNode;
//     let rowIndex = row.rowIndex;
//     row.parentNode.deleteRow(rowIndex);
// }
// function closeForm(){
//     let form = document.getElementById("idFormToAdd");
//     form.style.display = 'none';
// }
// function openForm(){
//     let form = document.getElementById("idFormToAdd");
//     form.style.display = 'block';
// }

function tasks(){
    $('#toChange').html("");
}
function dashboard(){
    $('#toChange').html("");
}
function students(){
    $('#toChange').load("/htmlFiles/tableFile.html");
}