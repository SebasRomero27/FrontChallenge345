function callReportStatus(){
    console.log("test");
    $.ajax({
        url:"http://129.151.115.179:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(response){
            console.log(response);
            lightResponse(response);
        }
    });
}
function lightResponse(response){

    let myTable="<table>";
     myTable+="<tr>";
        myTable+="<th>Completed</th>";
        myTable+="<td>"+response.completed+"</td>";
        myTable+="<th>Cancelled</th>";
        myTable+="<td>"+response.cancelled+"</td>";
     myTable+="</tr>";
    myTable+="</table>";
    $("#statusAnswer").html(myTable);
}
function callReportDate(){

    var dateInitial = document.getElementById("RstarDate").value;
    var dateFInal = document.getElementById("RdevolutionDate").value;
    console.log(dateInitial);
    console.log(dateFInal);
    
        $.ajax({
            url:"http://129.151.115.179:8080/api/Reservation/report-dates/"+dateInitial+"/"+dateFInal,
            type:"GET",
            datatype:"JSON",
            success:function(response){
                console.log(response);
                lightResponseDate(response);
            }
        });
    }
    function lightResponseDate(response){

        let myTable="<table>";
        myTable+="<tr>";
          
        for(i=0;i<response.length;i++){
        myTable+="<th>total</th>";
            myTable+="<td>"+response[i].devolutionDate+"</td>";
            myTable+="<td>"+response[i].startDate+"</td>";
            myTable+="<td>"+response[i].status+"</td>";
          
          
            myTable+="</tr>";
        }
        myTable+="</table>";
        $("#resultDate").html(myTable);
    }

    function callCusReport(){
        $.ajax({
            url:"http://129.151.115.179:8080/api/Reservation/report-clients",
            type:"GET",
            datatype:"JSON",
            success:function(response){
                console.log(response);
                lightResponseClients(response);
            }
        });
    }
    function lightResponseClients(response){

        let myTable="<table>";
        myTable+="<tr>";
          
        for(i=0;i<response.length;i++){
        myTable+="<th>total</th>";
            myTable+="<td>"+response[i].total+"</td>";
            myTable+="<td>"+response[i].client.name+"</td>";
            myTable+="<td>"+response[i].client.email+"</td>";
            myTable+="<td>"+response[i].client.age+"</td>";
          
            myTable+="</tr>";
        }
        myTable+="</table>";
        $("#clientsTable").html(myTable);
    }
