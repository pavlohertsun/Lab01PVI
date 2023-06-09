function addStudent(id, name, group, gender, birthday,status){
        let newRow=$('<tr>');
        newRow.append($('<td><input type="checkbox" onchange="checkInputs2(this), checkInputs3(this)"></td>'));
        newRow.append($('<td>').text(name));
        newRow.append($('<td>').text(group));
        newRow.append($('<td>').text(gender));
        newRow.append($('<td>').text(birthday));
        newRow.append($('<td><input type="radio" checked="checked"></td>'));
        newRow.append($('<td><button onclick="openDeleteDialog(this)"><span class="glyphicon glyphicon-trash"></span></button><button onclick="openEditDialog(this)"><span class="glyphicon glyphicon-pencil"></span></button></td>'));
        newRow.append($('<td style="display: none">').text(id));
        $('#myTable').append(newRow);
}
function addStudentToDB(nameInput, groupInput, genderInput,birthdayInput){
        $.ajax({
                url: "./phpFiles/addStudent.php",
                type: "POST",
                data:{name:nameInput, group:groupInput, gender:genderInput, birthday:birthdayInput},
                success : function (response){
                        addStudent(response, nameInput, groupInput, genderInput,birthdayInput, 1);
                        console.log("New student successfully added with id :" + response);
                },
                error : function (jqXHR, textStatus, errorThrown){
                        console.error("Error while adding:" + textStatus, errorThrown);
                        return null;
                }
        });
}
function deleteStudent(button){
        $('#myTable tr').eq(button.parentNode.parentNode.rowIndex).remove();
}
function deleteStudentFromDB(id){
        $.ajax({
                url: "./phpFiles/deleteStudent.php",
                type: "POST",
                data:{id:id},
                success : function (response){
                        console.log(response);
                },
                error : function (jqXHR, textStatus, errorThrown){
                        console.error("Error while deleting:" + textStatus, errorThrown);
                }
        });
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
function editStudentInDB(nameInput, groupInput, genderInput, birthdayInput, id){
        $.ajax({
                url: "./phpFiles/editStudent.php",
                type: "POST",
                data:{name:nameInput, group:groupInput, gender:genderInput, birthday:birthdayInput, id:id},
                success : function (response){
                        console.log(response);
                },
                error : function (jqXHR, textStatus, errorThrown){
                        console.error("Error while adding:" + textStatus, errorThrown);
                }
        });
}
function birthdayCheck(birthday){
        let dataYear = new Date(birthday).getFullYear();
        let todayYear = new Date().getFullYear();
        if((todayYear - dataYear) < 16){
                alert("Choose correct date");
                return false;
        }
        if((todayYear - dataYear) == 16){
                let todayMonth = new Date().getMonth();
                let dataMonth = new Date(birthday).getMonth();
                if((todayMonth - dataMonth) > 0){
                        return true;
                }
                if((todayMonth - dataMonth) < 0){
                        alert("Choose correct date");
                        return false;
                }
                if((todayMonth - dataMonth) == 0){
                        let todayDate = new Date().getDate();
                        let dataDate = new Date(birthday).getDate();
                        if((todayDate - dataDate) >= 0){
                                return true;
                        }
                        if((todayDate - dataDate) < 0){
                                alert("Choose correct date");
                                return false;
                        }
                }
        }
        return true;
}
function checkInputs(){
        let mainCheckBox = $('#myTable tr').eq(0).find('th').eq(0).find('input[type="checkbox"]').prop('checked');
        if(mainCheckBox){
              const checkBoxArray = $('#myTable tr').find('td');
                checkBoxArray.each( function(){
                        const check = $(this).find("input[type='checkbox']");
                        check.prop('checked', true);
                });
        }
        else{
                const checkBoxArray = $('#myTable tr').find('td');
                checkBoxArray.each( function(){
                        const check = $(this).find("input[type='checkbox']");
                        check.prop('checked', false);
                });
        }
}
function checkInputs2(checkBox){
        let check = $(checkBox).prop('checked');
        if(!check){
                let mainCheckBoxState = $('#checkBox').prop('checked');
                if(mainCheckBoxState){
                        let mainCheckBox = $('#checkBox');
                        mainCheckBox.prop('checked', false);
                }
        }
}
function checkInputs3(checkBox){
        let allChecked = true;
        let check = $(checkBox).prop('checked');
        if(check){
                const checkBoxArray = $('#myTable td').find("input[type='checkbox']");
                checkBoxArray.each( function(){
                        if (!this.checked){
                                allChecked = false;
                                return false;
                        }
                });
                let mainCheckBox = $('#checkBox');
                mainCheckBox.prop('checked', allChecked);
        }
}
function checkInputName(name){
        let firstChar = name.charAt(0);
        if(firstChar === firstChar.toUpperCase()){
                return true;
        }
        else{
                alert("Incorrect name input(name should start with uppercase symbol)");
                return false;
        }
}
function checkInputNameLength(name) {
        if (name.length <= 3) {
                alert("Incorrect name input(to less symbols)");
                return false;
        }
        else{
                return true;
        }
}
function checkInputNameSpecialSymbols(name){
        let regex = /[!@#$%^&*(),.?":{}|<>]/;
        if (regex.test(name)) {
                alert("Incorrect name input(name should not contain any special characters)");
                return false;
        }
        else {
                return true;
        }
}
