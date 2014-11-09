/**
 * Created by Paul on 11/9/2014.
 */
var request = require('request');
var OAuth = require('oauth-1.0a');

var request_data = {
    url: 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=iPhone_News&count=2',
    method: 'GET'
};

var token = {
    public: '2869050389-0Qk7ZAqa8IjSYHJZ5XzhCx77R4ZQohyA2SkEDvx',
    secret: 'bWENzZIUkmH1HjZgHFjEAw0DWLLHW1i9VyYaMyxKosHww'
};

var oauth = OAuth({
    consumer: {
        public: '4GyK1FQBXPp28Idfz2zC2gnWh',
        secret: 'jMTELODiylysQs1alOYUbl15JSAP7FNRmL4kv4JbTbUcjl9qJX'
    }
});

request({
    url: request_data.url,
    method: request_data.method,
    form: oauth.authorize(request_data, token)
}, function(error, response, body) {
    if (error)
        throw error;
    console.log(body);
});