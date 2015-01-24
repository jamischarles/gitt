/**
 * Features:
 * - Diff
 * - Show my open PRs (against the current project)
 * - stats
 * - git log and search like stephen mentioned
 * - code search
 * - comment search
 * - compare local to remote
 * - author search
 * - find lost things
 * - find when change was introduced
 */

/**
 * TODO:
 * - consider using this https://github.com/mikedeboer/node-github
 * - study this if I have problems https://www.npmjs.com/package/pull-report
 * - https://github.com/ForbesLindesay/github-basic#options
 *
 * MVP1: List open PRs in public
 * MVP2: List open PRs for Github enterprise
 * - allow line wrapping
 * - allow open PR # from cli
 */


/**
 * Goals:
 * - This is partially sugar, and partially to teach git best practictes and more
 * about Git. It will teach you what a command is actually doing. Make it easier
 * for common use cases that are really helpful but people don't know how to do.
 *
 * This could even be a code-school thing at some point...
 *
 * Since it's a side thing it should be small and stupid, but it can also be fun...
 */

/**
* Module dependencies.
*/
var program = require('commander');

/**
* Local libs
*/
var gitt = require('./lib/actions.js');

var pkg = require('./package.json');
var version = pkg.version;

// Version and Options
program
.version(version)
// .option('-c, --country [country]', 'some option ')

// Commands
program
.command('pr')
.description('Print open PRs on this repo')
.action(function () {
  // program.country gets pulled from the options passed in and set using .option above
  var config = {
    // 'country': program.country
  };
  gitt.getOpenPRs();
});

program
.command('open')
.description('Open PR [number] on this repo')
.action(function (number) {
  // program.country gets pulled from the options passed in and set using .option above
  var config = {
    // 'country': program.country
  };
  gitt.viewPR(number);
});


//this kicks everything off and is required
program.parse(process.argv);

// If no params have been passed, output help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
