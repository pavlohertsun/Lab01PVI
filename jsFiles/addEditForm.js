function openAddDialog(){
    $('#dialogContainer').load("./htmlFiles/addEditFormFile.html", function(){
        $('#cancelButton').on("click",function (){
            $('#dialogContainer').css("display", "none");
        });
        $('#idForm').submit(function (event){
            event.preventDefault();
            let data = $(this).serialize();
            let fields =  data.split('&');
            let object = {};

            $.each(fields, function(index, field){
                object[field.split('=')[0]] = field.split("=")[1];
            });
            if(!birthdayCheck(object.birthdayInput)) return;
            addStudentToDB(object.nameInput, object.groupInput, object.genderInput, object.birthdayInput);
            $('#dialogContainer').css("display", "none").html("");
        });
    }).css("display","block");
}
function openEditDialog(button){
    $('#dialogContainer').load("./htmlFiles/addEditFormFile.html", function () {
        let name = $('#myTable tr').eq(button.parentNode.parentNode.rowIndex).find('td').eq(1).text();
        let group = $('#myTable tr').eq(button.parentNode.parentNode.rowIndex).find('td').eq(2).text();
        let gender = $('#myTable tr').eq(button.parentNode.parentNode.rowIndex).find('td').eq(3).text();
        let birthday = $('#myTable tr').eq(button.parentNode.parentNode.rowIndex).find('td').eq(4).text();
        pushInfoIntoEditForm(name, group, gender, birthday);
        $('#cancelButton').on("click",function (){
            $('#dialogContainer').css("display", "none");
        });
        $('#idForm').submit(function (event){
            event.preventDefault();
            let data = $(this).serialize();
            let fields = data.split('&');
            let object = {};

            $.each(fields, function(index, field){
                object[field.split('=')[0]] = field.split("=")[1];
            });
            let idOfEditingStudent = $('#myTable tr').eq(button.parentNode.parentNode.rowIndex).find('td').eq(7).text();
            if(!birthdayCheck(object.birthdayInput)) return;
            editStudentInDB(object.nameInput, object.groupInput, object.genderInput, object.birthdayInput, idOfEditingStudent);
            editStudent(object.nameInput, object.groupInput, object.genderInput, object.birthdayInput, button);
            $('#dialogContainer').css("display", "none").html("");
        });

    }).css("display","block");
}
function openDeleteDialog(button){
    $('#dialogContainer').load("./htmlFiles/deleteFormFile.html", function(){
        $('#cancelDeleteButton').on("click",function (event){
            event.preventDefault();
            $('#dialogContainer').css("display", "none");
        });
        $('#idDeleteForm').submit(function (event){
            event.preventDefault();
            let idOfDeletingStudent = $('#myTable tr').eq(button.parentNode.parentNode.rowIndex).find('td').eq(7).text();
            deleteStudentFromDB(idOfDeletingStudent);
            deleteStudent(button);
            $('#dialogContainer').css("display", "none").html("");
        });
    }).css("display","block");
}