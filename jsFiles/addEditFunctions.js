let generatedID = 0;
function addStudent(name, group, gender, birthday){
        let newRow=$('<tr>');
        newRow.append($('<td><input type="checkbox"></td>'));
        newRow.append($('<td>').text(name));
        newRow.append($('<td>').text(group));
        newRow.append($('<td>').text(gender));
        newRow.append($('<td>').text(birthday));
        newRow.append($('<td><input type="radio" checked="checked"></td>'));
        newRow.append($('<td><button onclick="openDeleteDialog(this)">D</button><button onclick="openEditDialog(this)">E</button></td>'));
        newRow.append($('<td style="display: none">').text(generatedID++));
        $('#myTable').append(newRow);
        addStudentToDB(name, group, gender, birthday);
}
function addStudentToDB(nameInput, groupInput, genderInput,birthdayInput){
        $.ajax({
                url: "../phpFiles/addStudent.php",
                type: "POST",
                data:{name:nameInput, group:groupInput, gender:genderInput, birthday:birthdayInput},
                success : function (response){
                        console.log(response);
                },
                error : function (jqXHR, textStatus, errorThrown){
                        console.error("Error :" + textStatus, errorThrown);
                }
        });
}
function deleteStudent(button, id){
        $('#myTable tr').eq(button.parentNode.parentNode.rowIndex).remove();
}
function editStudent(name, group, gender, birthday, button){
        $('#myTable tr').eq(button.parentNode.parentNode.rowIndex).find('td').eq(1).text(name);
        $('#myTable tr').eq(button.parentNode.parentNode.rowIndex).find('td').eq(2).text(group);
        $('#myTable tr').eq(button.parentNode.parentNode.rowIndex).find('td').eq(3).text(gender);
        $('#myTable tr').eq(button.parentNode.parentNode.rowIndex).find('td').eq(4).text(birthday);
}

function pushInfoIntoEditForm(name, group, gender, birthday){
        $('#nameInput').val(name);
        $('#groupInput').val(group);
        $('#genderInput').val(gender);
        $('#birthdayInput').val(birthday);
}