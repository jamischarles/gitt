/**
* Module dependencies.
*/
var Wreck = require('wreck');
var Table = require('cli-table');

// Anything that needs to be run immediately upon require?
module.exports = {

  // View this PR in the browser
  viewPR: function () {

  },

  // Get open PRs against the current repo
  getOpenPRs: function () {
    // Use yourdomain.com/api/v3/ for enterprise

    var base_uri = 'https://api.github.com';

    var options = {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'jamischarles' // required by GH
      }
    };

    // TODO: Automatically pull what repo you're in. From git remote?

    Wreck.get(base_uri + '/repos/jamischarles/atom-todo-show/pulls', options, function (err, res, payload) {
      payload = JSON.parse(payload);

      console.log('payload', payload);




      // TODO: In an ascii table, show the OPEN prs
      // Fields: #, Title, body (abbreviated), branches?, link for easy opening, user, stats?

      // FIXME: Abstract console outup to another file

      // instantiate CLI Table
      var table = new Table({
        head: ['#', 'Title', 'Body', 'User', 'Link']
        , colWidths: [4, 40, 50, 15, 50]
      });


      payload.forEach(function (item) {
        var num = item.number;
        var title = item.title;
        var body = item.body.substring(0, 50); // cut off at 50 chars
        var user = item.user.login;
        var link = item.html_url;

        table.push([num, title, body, user, link]);
      });


      // Render Table
      console.log('Open PRs:');
      console.log(table.toString());

    });
  }

};
