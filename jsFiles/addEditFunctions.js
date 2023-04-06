let generatedID = 0;
function addStudent(name, group, gender, birthday){
        let newRow=$('<tr>');
        newRow.append($('<td><input type="checkbox"></td>'));
        newRow.append($('<td>').text(name));
        newRow.append($('<td>').text(group));
        newRow.append($('<td>').text(gender));
        newRow.append($('<td>').text(birthday));
        newRow.append($('<td><input type="radio" checked="checked"></td>'));
        newRow.append($('<td><button onclick="openDeleteDialog(this)">D</button><button onclick="openAddDialog()">E</button></td>'));
        newRow.append($('<td style="display: none">').text(generatedID++));
        $('#myTable').append(newRow);
}
function deleteStudent(button, id){
        $('#myTable tr').eq(button.parentNode.parentNode.rowIndex).remove();
}