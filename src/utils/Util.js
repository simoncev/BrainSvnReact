import exec from 'exec';
import child_process from 'child_process';
import Promise from 'bluebird';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import remote from 'remote';
var app = remote.require('app');

var Util = {
    exec: function (args, options) {
        options = options || {};

        // Add resources dir to exec path for Windows
        if (this.isWindows()) {
            options.env = options.env || {};
            if (!options.env.PATH) {
                options.env.PATH = process.env.RESOURCES_PATH + ';' + process.env.PATH;
            }
        }

        let fn = Array.isArray(args) ? exec : child_process.exec;
        return new Promise((resolve, reject) => {
            fn(args, options, (stderr, stdout, code) => {
                if (code) {
                    var cmd = Array.isArray(args) ? args.join(' ') : args;
                    reject(new Error(cmd + ' returned non zero exit code. Stderr: ' + stderr));
                } else {
                    resolve(stdout);
                }
            });
        });
    },
    isWindows: function () {
        return process.platform === 'win32';
    },
    escapePath: function (str) {
        return str.replace(/ /g, '\\ ').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    },
    home: function () {
        return app.getPath('home');
    },
    documents: function () {
        // TODO: fix me for windows 7
        return 'Documents';
    },
    supportDir: function () {
        return app.getPath('userData');
    },
    CommandOrCtrl: function () {
        return this.isWindows() ? 'Ctrl' : 'Command';
    },
    removeSensitiveData: function (str) {
        if (!str || str.length === 0 || typeof str !== 'string' ) {
            return str;
        }
        return str.replace(/-----BEGIN CERTIFICATE-----.*-----END CERTIFICATE-----/mg, '<redacted>')
            .replace(/-----BEGIN RSA PRIVATE KEY-----.*-----END RSA PRIVATE KEY-----/mg, '<redacted>')
            .replace(/\/Users\/[^\/]*\//mg, '/Users/<redacted>/')
            .replace(/\\Users\\[^\/]*\\/mg, '\\Users\\<redacted>\\');
    },
    packagejson: function () {
        return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
    },
    settingsjson: function () {
        var settingsjson = {};
        try {
            settingsjson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'settings.json'), 'utf8'));
        } catch (err) {}
        return settingsjson;
    },
    randomId: function () {
        return crypto.randomBytes(32).toString('hex');
    },
    windowsToLinuxPath: function (windowsAbsPath) {
        var fullPath = windowsAbsPath.replace(':', '').split(path.sep).join('/');
        if (fullPath.charAt(0) !== '/') {
            fullPath = '/' + fullPath.charAt(0).toLowerCase() + fullPath.substring(1);
        }
        return fullPath;
    },
    linuxToWindowsPath: function (linuxAbsPath) {
        return linuxAbsPath.replace('/c', 'C:').split('/').join('\\');
    },
    webPorts: ['80', '8000', '8080', '8888', '3000', '5000', '2368', '9200', '8983']
};

module.exports = Util;