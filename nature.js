$(document).ready(function () {
    $.ajax({
        url: "api/natural.json",
        method: "get",
        dataType: 'json',
        data: {
            iDataArr:2022-10-17,
            stat: "",
            xhr: "",
        },
        beforeSend: function(){
        },
        success: function (data) {
            console.log(data);
        }
    });
});
