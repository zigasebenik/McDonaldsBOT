var request = require('request');

prijava = function(email,password)
{
    var data = 
    { 
        method: 'POST',
        url: 'https://www.mcdonalds.si/auth/LoginUser',
        headers: 
        {    'Client-ID': '077d6ddb4924e3f212415uuIxWfmEGSeS3FhlezRLaN.izTeM9s16' },
            
        body: '{ "UName": "'+email+'",  "UPass": "'+password+'"}'
    };

    request(data, function (error, response, body) {

        var response = JSON.parse(body);
        
        dobiPiskot(response.Data.AccessToken,response.Data.UserID);
        vzemiPiskot(response.Data.AccessToken,response.Data.UserID);

        var koda = "";
        koda = qrKoda();

        skeniranjeKode(koda,response.Data.AccessToken,response.Data.UserID);
    });
}

dobiPiskot = function(accesToken,userId)
{
    var data = 
    { 
        method: 'POST',
        url: 'https://www.mcdonalds.si/auth/GetCoupons',
        headers: 
        { 'Postman-Token': '863471e4-8230-4ef9-a672-44c6665ea57b',
            'Cache-Control': 'no-cache',
            'Client-ID': '077d6ddb4924e3f212415uuIxWfmEGSeS3FhlezRLaN.izTeM9s16' },
            
            body: '{\r\n    "attr": "{\\"AppVer\\":\\"1.0.5\\",\\"OSVer\\":\\"Android 7.0\\",\\"OSType\\":1}", "showEmpty": "0",\r\n    "ARB_INTERNET_ACCESS": "1",\r\n    "cantCheckIn": "0",\r\n    "appVersion": "1.0.5 (15)",\r\n    "ARB_ORIENTATION": "portrait",\r\n    "showCallToAction": "0",\r\n    "isLoggedIn": "1",\r\n    "AccessToken": "'+accesToken+'",\r\n    "UserID": "'+userId+'"\r\n}'
    };

    request(data, function (error, response, body) {
        console.log(body);
    });
}

vzemiPiskot = function(accesToken,userId)
{
    var data = 
    { 
        method: 'POST',
        url: 'https://www.mcdonalds.si/auth/PlayJoker',
        headers: 
        { 'Postman-Token': '863471e4-8230-4ef9-a672-44c6665ea57b',
            'Cache-Control': 'no-cache',
            'Client-ID': '077d6ddb4924e3f212415uuIxWfmEGSeS3FhlezRLaN.izTeM9s16' },
            
            body: '{\r\n    "attr": "{\\"AppVer\\":\\"1.0.5\\",\\"OSVer\\":\\"Android 7.0\\",\\"OSType\\":1}",\r\n    "showEmpty": "0",\r\n    "ARB_INTERNET_ACCESS": "1",\r\n    "cantCheckIn": "0",\r\n    "appVersion": "1.0.5 (15)",\r\n    "ARB_ORIENTATION": "portrait",\r\n    "showCallToAction": "0",\r\n    "isLoggedIn": "1",\r\n    "AccessToken": "'+accesToken+'",\r\n    "UserID": "'+userId+'"\r\n}'
    };

    request(data, function (error, response, body) {
        console.log(body);
    });
}

qrKoda = function()
{
    function lol(){
        let zoi = "000000000000000000000000000000000000000"; //Zaščitna oznaka izdajatelja računa
        zoi = makeid(); //random vrednost itak se ignorira

        let davcna = "86878255"; //davčna številka zavezanca

        let time = "000000000000"; //LLMMDDUUMMSS
        const date = new Date();
        time = pad2(date.getFullYear().toString().slice(-2)) + pad2(date.getMonth() + 1) + pad2( date.getDate()) + pad2( date.getHours() ) + pad2( date.getMinutes() -5) + pad2( date.getSeconds() );

        //sestavi kodo
        let code = zoi + davcna + time;

        //izračun paritete po modulu 10
        let pariteta = code.split("").reduce((a, b) => Number(a) + Number(b), 0)%10;
        code += pariteta;
        console.log(code);
        return code;
    }

    return lol();
    
    function pad2(n){
      return n < 10 ? '0' + n : n
    }

    function makeid() {
      var text = "";
      var possible = "0123456789";

      for (var i = 0; i < 39; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
      return text;
    }
}

skeniranjeKode = function(koda,accesToken,userId)
{
    var x = "";
    x = koda;
    //console.log(x);
    //console.log('"'+x+'"');
    
    var options = 
    {
        method: 'POST',
        url: 'https://www.mcdonalds.si/auth/RecordCheckIn',
        headers: 
        { 'Postman-Token': '2412bccd-c778-4939-be3e-d2e68d3b609e',
            'Cache-Control': 'no-cache',
            'Client-ID': '077d6ddb4924e3f212415uuIxWfmEGSeS3FhlezRLaN.izTeM9s16'
        },
        body: '{\r\n  \r\n  "ARBO_QR": {\r\n    "value": "'+x+'",\r\n   "isRead": 1\r\n  },\r\n  "ARB_INTERNET_ACCESS": "1",\r\n  "cantCheckIn": "0",\r\n  "appVersion": "1.0.5 (15)",\r\n  "ARB_ORIENTATION": "portrait",\r\n  "checkInMessage": "Preverjanje...",\r\n  "isLoggedIn": "1",\r\n  "QRCode": "'+x+'",\r\n  "AccessToken": "'+accesToken+'",\r\n  "UserID": "'+userId+'"\r\n}'
    
    };

    request(options, function (error, response, body) {
        console.log(body);
    });
}

dobiEmail = function()
{
    var options = { method: 'GET',
    url: 'https://www.minuteinbox.com/'
    
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);

        var x = body.getElementsByTagName("p");
        //console.log(dom.window.document.querySelector("p").textContent);
    });

}


prijava("h1404227@nwytg.com","gesloo");

//TEST
//dobiPiskot("eDqYSUBnKZrnq6ZU1kNVRsoDY","5af5d12aba270");
//vzemiPiskot("eDqYSUBnKZrnq6ZU1kNVRsoDY","5af5d12aba270");
//skeniranjeKode(qrKoda(),"eDqYSUBnKZrnq6ZU1kNVRsoDY","5af5d12aba270");
//dobiEmail();
//qrKoda();

