function getCategoriesInformation() {
    $.ajax({
        url: "http://129.151.115.179:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            showAnswer(response);
        }
    });
}

function showAnswer(response) {

    /*let myTable="<table class='ui celled table'>
    
    "; */
    //let myTable = "<table class='ui celled table'>" + "<tr><th>NAME<th>DESCRIPTION</tr>"+;//
    let myTable = "<table class='ui center aligned celled table'>" + "<thead><tr><th>NAME</th><th colspan='3'>DESCRIPTION</th></tr></thead>"

    for (i = 0; i < response.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + response[i].name + "</td>";
        myTable += "<td>" + response[i].description + "</td>";
        myTable += "<td> <button class='ui green button' onclick=' updateCategoriesInformation(" + response[i].id + ")'>Update</button>";
        myTable += "<td> <button class='ui red button' onclick='deleteCategory(" + response[i].id + ")'>Delete</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#Table1").html(myTable);
}

function saveCategoriesInformation() {
    let var2 = {
        name: $("#Cname").val(),
        description: $("#Cdescription").val()
    };

    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),

        url: "http://129.151.115.179:8080/api/Category/save",


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

function updateCategoriesInformation(idElement) {
    let myData = {
        id: idElement,
        name: $("#Cname").val(),
        description: $("#Cdescription").val()

    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.115.179:8080/api/Category/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (response) {
            $("#resultado").empty();
            $("#id").val("");
            $("#Cname").val("");
            $("#Cdescription").val("");
            getCategoriesInformation();
            alert("Category updated")
        }
    });

}



function deleteCategory(idElement) {
    let myData = {
        id: idElement
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.115.179:8080/api/Category/" + idElement,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (response) {
            $("#resultado").empty();
            getCategoriesInformation();
            alert("Deleted.")
        }
    });

}

