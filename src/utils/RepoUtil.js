import path from 'path';
process.env.SVN_PATH = path.join(__dirname, '../Subversion/bin/');
var util = require('util');

var RepoUtil = {
    getSvnInfo(repoPath) {
        var execSync = require('child_process').execSync;
        try {
            var child = execSync(process.env.SVN_PATH + 'svn info ' + repoPath);
        } catch (error) {
            console.log(util.inspect(error));
            var errorMsg = error.stderr.toString();
            if (errorMsg.indexOf('E155007') != -1) {
                return false;
            }
        }
        var repoInfo = child.toString().split("\n");
        var repo = {};
        repo.name = this.getRepoName(repoInfo);
        repo.path = repoPath[0];
        repo.url = this.getRepoUrl(repoInfo);
        repo.revision = this.getRepoRevision(repoInfo);
        return repo;
    },

    getRepoName(repoInfo) {
        var repoName = repoInfo[4].split('/');
        repoName = repoName[repoName.length - 1];
        return repoName;
    },

    getRepoUrl(repoInfo) {
        var repoUrl = repoInfo[2].split('/');
        repoUrl = repoUrl[repoUrl.length - 1];
        return repoUrl;
    },

    getRepoRevision(repoInfo) {
        var revision = repoInfo[6].split(':');
        revision = revision[revision.length - 1];
        return revision;
    }
};

/**
 *
 * Path: C:\Users\GadyBarak\Documents\Svn\trunk
 Working Copy Root Path: C:\Users\GadyBarak\Documents\Svn\trunk
 URL: https://lenovo-pc:8443/svn/TestRepo/trunk
 Relative URL: ^/trunk
 Repository Root: https://lenovo-pc:8443/svn/TestRepo
 Repository UUID: 62668bac-3d53-6242-8310-3a8be1d9363d
 Revision: 1
 Node Kind: directory
 Schedule: normal
 Last Changed Author: VisualSVN Server
 Last Changed Rev: 1
 Last Changed Date: 2015-11-03 21:51:37 +0200 (Tue, 03 Nov 2015)

 */
module.exports = RepoUtil;