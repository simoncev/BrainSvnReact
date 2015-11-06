import path from 'path';
process.env.SVN_PATH = path.join(__dirname, '../Subversion/bin/');
var util = require('util');

var RepoUtil = {
    getSvnInfo(repoPath) {
        var execSync = require('child_process').execSync
        try {
            var child = execSync(process.env.SVN_PATH + 'svn info ' + repoPath);
        } catch (error) {
            console.log(util.inspect(error));
            var errorMsg = error.stderr.toString();
            if (errorMsg.indexOf('E155007') != -1) {
                return false;
            }
        }
        return true;
    }
};


module.exports = RepoUtil;