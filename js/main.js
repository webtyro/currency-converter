var regExp = /^\d+$/;
var value = 0;
var fromData = '';
var toData = '';

$(document).ready(function () {
    $(document).on("click", ".startConversion", function () {
        value = $(".currencyValue").val();
        fromData = $(".fromData").val();
        toData = $(".toData").val();
        if (fromData != toData) {
            if ($.trim(value).length != 0 && regExp.test($.trim(value))) {
                getRate(fromData, toData);
            }
        }else{
            $(".resultArea").html("From and To cannot be same");
        }
    });
});
function getRate(from, to) {
    var script = document.createElement('script');
    script.setAttribute('src', "http://query.yahooapis.com/v1/public/yql?q=select%20rate%2Cname%20from%20csv%20where%20url%3D'http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes%3Fs%3D" + from + to + "%253DX%26f%3Dl1n'%20and%20columns%3D'rate%2Cname'&format=json&callback=parseExchangeRate");
    document.body.appendChild(script);
}

function parseExchangeRate(data) {
    console.log(data);
    var name = data.query.results.row.name;
    var rate = parseFloat(data.query.results.row.rate, 10);
    $(".resultArea").html('<a href="https://www.yahoo.com/?ilc=401" target="_blank">'+name+" "+rate * value +'<img src="https://poweredby.yahoo.com/purple_retina.png" width="134" height="29"/></a>');
}
