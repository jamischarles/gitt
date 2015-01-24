/**
* Module dependencies.
*/
var Wreck = require('wreck');
var Table = require('cli-table');
var shell = require('shelljs');


// TODO: Save off the current repo and things like that...

// What is the current repo?
function getCurrentRepo() {
  // make it sync
  var origin = shell.exec('git config --get remote.origin.url', {silent: true});

  // extract the user/repo from the response  https://github.com/jamischarles/gitt.git  (jamischarles) (gitt)
  // TODO: Write tests on this regex. In url fragments, allow anything but '.'
  var result = origin.output.match(/https?:\/\/\w+\.com\/([^.]+)\/([^.]+)/i);
  var user = result[1];
  var repo = result[2].trim(); // don't know how, but \n sneaks in after somehow... TODO: fix the regex to address this

  // concat them again since that's what we want
  return user + '/' + repo;
}




// Anything that needs to be run immediately upon require?
module.exports = {

  // TODO: Fix this name. We can do better
  // View this PR in the browser
  viewPR: function (number) {
    var currentRepo = getCurrentRepo();

    var uri = "https://github.com/" + currentRepo + "/pull/" + number;

    shell.exec('open ' + uri)
  },

  // Get open PRs against the current repo
  getOpenPRs: function () {
    // Use yourdomain.com/api/v3/ for enterprise

    var base_uri = 'https://api.github.com';
    var uri;

    var options = {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'jamischarles' // required by GH
      }
    };

    // get the repo of the current folder, and construct the URI
    var currentRepo = getCurrentRepo();
    uri = base_uri + '/repos/' + currentRepo + '/pulls';

    // Make github API request
    Wreck.get(uri, options, function (err, res, payload) {
      payload = JSON.parse(payload);

      // console.log('payload', payload);




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

}; // Module exports
