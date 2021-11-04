function autoStartClients(){
    
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
function autoStartCabin(){

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


function autoStartMessages(){
    console.log("Executing")
    $.ajax({
        url:"http://129.151.115.179:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(response){
            console.log(response)
            lightAnsMessage(response);
        }
    
    })

}

function lightAnsMessage(response){
    let myTable = "<table class='ui center aligned celled table'>" + 
    "<thead><tr><th>ID</th><th>Message</th><th>Cabin</th><th>Client</th><th colspan='3'>Options</th></tr></thead>";
    for(i=0;i<response.length;i++){
        let messageText = response[i].messageText? response[i].messageText : null;
        let cabinName = response[i].cabin? response[i].cabin.name : null;
        let clientName = response[i].client? response[i].client.name : null;
        myTable+="<tr>";
        myTable+="<td>"+ response[i].idMessage +"</td>";
        myTable+="<td>"+ messageText +"</td>";
        myTable+="<td>"+ cabinName + "</td>";
        myTable+="<td>"+ clientName + "</td>";
        myTable+="<td> <button class='ui green button' onclick=' updateMessageInfo("+response[i].idMessage+")'>Update</button>";
        myTable+="<td> <button class='ui red button' onclick='deleteMessage("+response[i].idMessage+")'>Delete</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#TableMessages").html(myTable);
}


function saveMessageInfo(){
    if ($("#messagetext").val().length==0 ){

        alert("Please fill all the fields");
    }else{
    
    
    let var2 = {
        
        messageText:$("#messagetext").val(),
        cabin:{id: +$("#select-cabin").val()},
        client:{idClient: +$("#select-client").val()},

     
        };
       
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://129.151.115.179:8080/api/Message/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Saved sucessfully");
            alert("Saved sucessfully");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
             window.location.reload()
            alert("Error saving information");
    
    
        }
        });
    }
}

function updateMessageInfo(idElement){
    let myData={
        idMessage:idElement,
        messageText:$("#messagetext").val(),
        cabin:{id: +$("#select-cabin").val()},
        client:{idClient: +$("#select-client").val()},

    


    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.115.179:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(response){
            $("#resultado").empty();
            $("#messagetext").val("");
           
            autoStartMessages();
            alert("Updated successfully")
        }
    });

}

function deleteMessage(idElement){
    let myData={
        idMessage:idElement
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://129.151.115.179:8080/api/Message/"+idElement,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(response){
            $("#resultado").empty();
            autoStartMessages();
            alert("Deleted.")
        }
    });

}