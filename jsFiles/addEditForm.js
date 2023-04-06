function openAddDialog(){
    $('#dialogContainer').load("/htmlFiles/addEditFormFile.html", function(){
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
            addStudent(object.nameInput, object.groupInput, object.genderInput, object.birthdayInput);
            $('#dialogContainer').css("display", "none").html("");
        });
    }).css("display","block");
}
function openDeleteDialog(button){
    $('#dialogContainer').load("/htmlFiles/deleteFormFile.html", function(){
        $('#cancelDeleteButton').on("click",function (){
            $('#dialogContainer').css("display", "none");
        });
        $('#submitDeleteButton').on("click",function (){
            let idOfDeletingStudent = $('#myTable tr').eq(button.parentNode.parentNode.rowIndex).find('td').eq(7).text();
            deleteStudent(button, idOfDeletingStudent);
            $('#dialogContainer').css("display", "none");
        });
    }).css("display","block");

}