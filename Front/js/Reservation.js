function autoStartClientRel(){
    
    $.ajax({
        url:"http://129.151.115.179:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(response){
          
            let $select = $("#select-client");
            $.each(response, function (id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            
            }); 
        }
    
    })
}
function autoCallCabin(){

    $.ajax({
        url:"http://129.151.115.179:8080/api/Cabin/all",
        type:"GET",
        datatype:"JSON",
        success:function(response){
        
            let $select = $("#select-cabin");
            $.each(response, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
         
            }); 
        }
    
    })
}

function addReservation() {
    
    if($("#startDate").val() == "" || $("#devolutionDate").val().length == ""  || $("#status").val().length == "" ){
        alert("All fields are required")
    }else{  
        let elements = {
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            cabin:{id: +$("#select-cabin").val()},
            client:{idClient: +$("#select-client").val()},
            
        }

        let dataToSend = JSON.stringify(elements);

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url:"http://129.151.115.179:8080/api/Reservation/save",
            data: dataToSend,
            datatype: "json",

            success: function (response) {
                console.log(response);
                $("#resultado5").empty();
                $("#startDate").val("");
                $("#devolutionDate").val("");
                $("#status").val("");

                //Listar Tabla

                alert("Saved Sucessfully")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error saving reservation")
            }
        });
    }
}



function listReservations(){
    $.ajax({
        url:"http://129.151.115.179:8080/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            lightReservation(response);
        }
    });
}

function lightReservation(response){ 
    let myTable = "<table class='ui center aligned celled table'>" + 
    "<thead><tr><th>ID</th><th>Start Date</th><th>Devolution Date</th><th>Status</th><th>Cabin</th><th>Client</th><th colspan='3'>Options</th></tr></thead>";
    for(i=0;i<response.length;i++){
        let cabinName = response[i].cabin? response[i].cabin.name : null;
        let clientName = response[i].client? response[i].client.name : null;    
        myTable+="<tr>";
        myTable+="<td>"+ response[i].idReservation +"</td>";
        myTable+="<td>"+ response[i].startDate +"</td>";
        myTable+="<td>"+ response[i].devolutionDate +"</td>";
        myTable+="<td>"+ response[i].status +"</td>";
        myTable+="<td>"+ cabinName+"</td>";
        myTable+="<td>"+ clientName +"</td>";
        myTable+='<td><button class="ui green red button" onclick="deleteReservation(' + response[i].idReservation + ')">Delete!</button></td>';
        myTable+='<td><button class="ui green blue button" onclick="loadReservationField(' + response[i].idReservation + ')">Edit!</button></td>';
        myTable+='<td><button class="ui green button" onclick="updateReservation(' + response[i].idReservation + ')">Update!</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#myReservsList").html(myTable);
}


function deleteReservation(idElement) {
    let elements = {
        id: idElement
    }

    let dataToSend = JSON.stringify(elements);

    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://129.151.115.179:8080/api/Reservation/"+idElement,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#myReservsList").empty();

                alert("Deleted sucessfully")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error deleting")
            }
        });
}


function loadReservationField(id) {
    $.ajax({
        dataType: 'json',
        url:"http://129.151.115.179:8080/api/Reservation/"+id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#startDate").val(item.startDate);
            $("#devolutionDate").val(item.devolutionDate);
            $("#status").val(item.status);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

//Manejador PUT
function updateReservation(idElement) {
    
    if($("#startDate").val() == "" || $("#devolutionDate").val() == "" || $("#status").val() == ""){
        alert("All the fields must be filled")
    }else{
        let elements = {
            idReservation: idElement,
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            skate:{id: +$("#select-cabin").val()},
            client:{idClient: +$("#select-client").val()},
        }

        let dataToSend = JSON.stringify(elements);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://129.151.115.179:8080/api/Reservation/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#myReservsList").empty();
                alert("Updated sucessfully!")

                //Limpiar Campos
                $("#resultado5").empty();

                $("#startDate").val("");
                $("#devolutionDate").val("");
                $("#status").val("");

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error updating!")
            }
        });
    }
}