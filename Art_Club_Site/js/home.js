$(document).ready(function() {
    $.ajax({
        url: "/../doc/about1.txt",
        dataType: "text",
        success: function(data) {
            $("p.about1").text(data);
        },
        error: function(error) {
            alert('error; ' + eval(error));
        }
    });
    $.ajax({
        url: "/../doc/about2.txt",
        dataType: "text",
        success: function(data) {
            $("p.about2").text(data);
        },
        error: function(error) {
            alert('error; ' + eval(error));
        }
    });
    $.ajax({
        url: "/../doc/about3.txt",
        dataType: "text",
        success: function(data) {
            $("p.about3").text(data);
        },
        error: function(error) {
            alert('error; ' + eval(error));
        }
    });
});