function getClientsInformation(){
    $.ajax({
        url:"http://129.151.115.179:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(response){
            console.log(response);
            showAnswer(response);
        }
    });
}

function showAnswer(response){

    let myTable = "<table class='ui center aligned celled table'>" + 
    "<thead><tr><th>Email</th><th>Password</th><th>Name</th><th>Age</th> <th colspan='3'>Options</th></tr></thead>";
    for(i=0;i<response.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+response[i].email+"</td>";
        myTable+="<td>"+response[i].password+"</td>";
        myTable+="<td>"+response[i].name+"</td>";
        myTable+="<td>"+response[i].age+"</td>";
        myTable+="<td> <button class='ui yellow button' onclick=' updateClientsInformation("+response[i].idClient+")'>Update</button>";
        myTable+="<td> <button class='ui red button' onclick='deleteClients("+response[i].idClient+")'>Delete</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#Table2").html(myTable);
}

function saveClientsInformation(){
    let var2 = {
        email:$("#Clemail").val(),
        password:$("#Clpassword").val(),
        name:$("#Clname").val(),
        age:$("#Clage").val(),
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://129.151.115.179:8080/api/Client/save",
       
        
       success: function (response) {
            console.log(response);
            console.log("Saved sucessfully");
            alert("Saved sucessfully");
            window.location.reload()

        },

        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("Was not saved");


        }
        });

}

function updateClientsInformation(idElement){
    let myData={
        idClient:idElement,
        email:$("#Clemail").val(),
        description:$("#Clpassword").val(),
        name:$("#Clname").val(),
        age:$("#Clage").val(),

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.115.179:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(response){
            $("#Table2").empty();
            $("#idClient").val("");
            $("#Clemail").val(""),
            $("#Clpassword").val("");
            $("#Clname").val("");
            $("#Clage").val("");
            getClientsInformation();
            alert("Client updated")
        }
    });

}



function deleteClients(idElement){
    let myData={
        idClient: idElement
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.115.179:8080/api/Client/" + idElement,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(response){
            $("#Table2").empty();
            getClientsInformation();
            alert("Deleted.")
        }
    });

}

