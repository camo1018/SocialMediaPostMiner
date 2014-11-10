/**
 * Created by Paul on 11/9/2014.
 */
var request = require('request');
var fs = require('fs');
var OAuth = require('oauth');

var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

var oauth = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    '4GyK1FQBXPp28Idfz2zC2gnWh',
    'jMTELODiylysQs1alOYUbl15JSAP7FNRmL4kv4JbTbUcjl9qJX',
    '1.0A',
    null,
    'HMAC-SHA1'
);

var parseData = function(data) {
    var dataArray = new Array();
    dataArray.push(data.id_str);
    var screenName = data.user.screen_name;
    dataArray.push('https://twitter.com/' + screenName + '/status/' + data.id_str);
    dataArray.push(data.text);
    var datetime = new Date(data.created_at);
    // Filter posts from after July
    if (datetime.getMonth() > 6) {
        return;
    }
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

oauth.get(
    'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=iPhone_News&count=3000',
    '2869050389-0Qk7ZAqa8IjSYHJZ5XzhCx77R4ZQohyA2SkEDvx',
    'bWENzZIUkmH1HjZgHFjEAw0DWLLHW1i9VyYaMyxKosHww',
    function(error, data, res) {
        if (error)
            console.error(error);
        var parsedData = JSON.parse(data);

        for (var i = 0; i < parsedData.length; i++) {
            parseData(parsedData[i]);
        }
    }
)