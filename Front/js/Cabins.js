function autoCallCat(){
    console.log("Executing")
    $.ajax({
        url:"http://129.151.115.179:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(response){
            console.log(response);
            let $select = $("#select-category");
            $.each(response, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}
//Manejador GET
function callCabinInfo() {
    $.ajax({
        url:"http://129.151.115.179:8080/api/Cabin/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            lightCabinResponse(response);
        }

    });

}

function lightCabinResponse(response){

    let myTable = "<table class='ui center aligned celled table'>" + 
    "<thead><tr><th>Cabin </th><th>Name</th><th>Rooms</th><th>Description</th><th>Category</th><th colspan='3'>Options</th></tr></thead>";
    for(i=0;i<response.length;i++){
        let cabinName = response[i].category? response[i].category.name : null;    
        myTable+="<tr>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].brand + "</td>";
        myTable+="<td>" + response[i].rooms + "</td>";
        myTable+="<td>" + response[i].description + "</td>";
        myTable+="<td>" + cabinName + "</td>";
        myTable+='<td><button class = "ui red button" onclick="deleteCabin(' + response[i].id + ')"> Delete cabin </button></td>';
        myTable+='<td><button class = "ui blue button" onclick="loadCabinInfo(' + response[i].id + ')">Edit Cabin </button></td>';
        myTable+='<td><button class = "ui green  button" onclick="updateCabins(' + response[i].id + ')">Update Cabin!</button></td>'
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#myCabinLis").html(myTable);
}

function loadCabinInfo(id) {
    $.ajax({
        dataType: 'json',
        url:"http://129.151.115.179:8080/api/Cabin/"+id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#nameCabin").val(item.name);
            $("#brand").val(item.brand);
            $("#rooms").val(item.rooms);
            $("#cabinDescription").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function addCabin() {

    if($("#nameCabin").val().length == 0 || $("#brand").val().length == 0 || $("#rooms").val().length == 0 || $("#cabinDescription").val().length == 0){
       alert("Todos los campos son obligatorios")
    }else{

            let elemento = {
                name: $("#nameCabin").val(),
                brand: $("#brand").val(),
                rooms: $("#rooms").val(),
                description: $("#cabinDescription").val(),
                category:{id: +$("#select-category").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url:"http://129.151.115.179:8080/api/Cabin/save",
                data: dataToSend,
                datatype: 'json',

                success: function (response) {
                    console.log(response);
                    console.log("Saved Sucessfully");
                    //Limpiar Campos
                    $("#myCabinLis").empty();
                    $("#nameCabin").val("");
                    $("#brand").val("");
                    $("#rooms").val("");
                    $("#cabinDescription").val("");
                    
                    alert("Saved Sucessfully")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Error saving")
                }
            });
    }
}
//Manejador DELETE
function deleteCabin(idElement) {
    var elemento = {
        id: idElement
    }

    var dataToSend = JSON.stringify(elemento);
console.log(dataToSend);
    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://129.151.115.179:8080/api/Cabin/"+idElement,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#myCabinLis").empty();
                callCabinInfo();
                alert("Deleted sucessfully")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error deleting")
            }
        });
}

//Manejador PUT
function updateCabins(idElement) {
    
    if($("#nameCabin").val().length == 0 || $("#brand").val().length == 0 || $("#rooms").val().length == 0 || $("#cabinDescription").val().length == 0){
        alert("All fields must be filled")
    }else{
        let elemento = {
            id: idElement,
            name: $("#nameCabin").val(),
            brand: $("#brand").val(),
            rooms: $("#rooms").val(),
            description: $("#cabinDescription").val(),
            category:{id: +$("#select-category").val()},
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://129.151.115.179:8080/api/Cabin/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#myCabinLis").empty();
                alert("Updated successfully")

                $("#myCabinLis").empty();
                $("#id").val("");
                $("#nameCabin").val("");
                $("#brand").val("");
                $("#rooms").val("");
                $("#cabinDescription").val("");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error updating!")
            }
        });
    }
}
