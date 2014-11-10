/**
 * Created by Paul on 11/9/2014.
 */
var fs = require('fs');
var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

var parseData = function(data) {
    var dataArray = new Array();
    var id = data.permalink_url.substring(38);
    dataArray.push(id);
    dataArray.push(data.permalink_url);
    dataArray.push(data.content);
    var datetime = new Date(data.firstpost_date*1000);
    dataArray.push(monthNames[datetime.getMonth()]);
    dataArray.push(datetime.getDate());
    var hours = datetime.getHours();
    var meridiem = hours / 12 >= 1 ? 'PM' : 'AM';
    var minutes = datetime.getMinutes();
    if (hours % 12 == 0) {
        hours = 12;
    }
    else {
        hours = hours % 12;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    dataArray.push(hours + ":" + minutes + ' ' + meridiem);

    fs.appendFile('./twitter-output.txt', dataArray.join('|') + '\n', function(err) {
        if (err)
            throw err;
    })
};

fs.readFile('./twitter-data-2.txt', 'utf8', function(err, data)  {
    if (err) {
        throw err;
    }

    var json = JSON.parse(data);
    var data = json.response.list;

    for (var i = 0; i < data.length; i++) {
        var currentData = data[i];
        parseData(currentData);
    }
});