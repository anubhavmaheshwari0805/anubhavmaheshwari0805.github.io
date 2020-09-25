$(document).ready(function() {
    $.ajax({
        url: "/Art_Club_Site/doc/about1.txt",
        dataType: "text",
        success: function(data) {
            $("p.about1").text(data);
        },
        error: function(error) {
            alert('error; ' + eval(error));
        }
    });
    $.ajax({
        url: "/Art_Club_Site/doc/about2.txt",
        dataType: "text",
        success: function(data) {
            $("p.about2").text(data);
        },
        error: function(error) {
            alert('error; ' + eval(error));
        }
    });
    $.ajax({
        url: "/Art_Club_Site/doc/about3.txt",
        dataType: "text",
        success: function(data) {
            $("p.about3").text(data);
        },
        error: function(error) {
            alert('error; ' + eval(error));
        }
    });
});