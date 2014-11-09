/**
 * Created by Paul on 11/9/2014.
 */
module.exports = function(app, modules) {
    app.get('/actions/getFacebookPosts', function(req, res) {
        var accessToken = req.session.accessToken;
        var pageId = req.query.pageId;
        modules.fb.api('/' + pageId + '/feed', 'get', { access_token: accessToken }, function(results) {
            if (!results || results.error)
                console.log('error');
            console.log(results);
            res.send('good');
        })
    });
}