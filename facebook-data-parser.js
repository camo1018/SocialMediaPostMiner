/**
 * Created by Paul on 11/9/2014.
 */
var fs = require('fs');
var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

fs.readFile('./facebook-data.txt', 'utf8', function(err, data)  {
    if (err) {
        throw err;
    }

    var json = JSON.parse(data);
    var data = json.data;

    for (var i = 0; i < data.length; i++) {
        var currentData = data[i];

        if (!currentData.object_id)
            continue;

        var line = new Array();
        line.push(currentData.object_id);
        if(currentData.message) {
            line.push(currentData.message.replace(/\r?\n|\r/g, " "));
        }
        else {
            line.push('');
        }
        line.push(currentData.link);
        var datetime = new Date(currentData.created_time);
        line.push(monthNames[datetime.getMonth()]);
        line.push(datetime.getDate());
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
        line.push(hours + ":" + minutes + ' ' + meridiem);

        fs.appendFile('./facebook-output.txt', line.join('|') + '\n', function (err) {
            if (err)
                throw err;
        });
    }
});