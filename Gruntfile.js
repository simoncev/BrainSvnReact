var packageJson = require('./package.json');
var electron = require('electron-prebuilt');

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    var target = grunt.option('target') || 'development';
    var beta = grunt.option('beta') || false;
    var alpha = grunt.option('alpha') || false;
    var env = process.env;
    env.NODE_PATH = '..:' + env.NODE_PATH;
    env.NODE_ENV = target;

    var certificateFile = grunt.option('certificateFile');

    var version = function (str) {
        var match = str.match(/(\d+\.\d+\.\d+)/);
        return match ? match[1] : null;
    };

    var BASENAME = 'BrainSvn';
    var APPNAME = BASENAME;

    if (alpha) {
        APPNAME += ' (Alpha)';
    } else if (beta) {
        APPNAME += ' (Beta)';
    }

    var OSX_OUT = './dist';
    var OSX_OUT_X64 = OSX_OUT + '/' + APPNAME + '-darwin-x64';
    var OSX_FILENAME = OSX_OUT_X64 + '/' + APPNAME + '.app';

    grunt.initConfig({
        IDENTITY: 'Developer ID Application: Brain Labs',
        APPNAME: APPNAME,
        APPNAME_ESCAPED: APPNAME.replace(/ /g, '\\ ').replace(/\(/g, '\\(').replace(/\)/g, '\\)'),
        OSX_OUT: OSX_OUT,
        OSX_OUT_ESCAPED: OSX_OUT.replace(/ /g, '\\ ').replace(/\(/g, '\\(').replace(/\)/g, '\\)'),
        OSX_OUT_X64: OSX_OUT_X64,
        OSX_FILENAME: OSX_FILENAME,
        OSX_FILENAME_ESCAPED: OSX_FILENAME.replace(/ /g, '\\ ').replace(/\(/g, '\\(').replace(/\)/g, '\\)'),

        // electron
        electron: {
            windows: {
                options: {
                    name: BASENAME,
                    dir: 'build/',
                    out: 'dist',
                    version: packageJson['electron-version'],
                    platform: 'win32',
                    arch: 'x64',
                    asar: true,
                    icon: 'resources/atom.ico'
                }
            },
            osx: {
                options: {
                    name: APPNAME,
                    dir: 'build/',
                    out: 'dist',
                    version: packageJson['electron-version'],
                    platform: 'darwin',
                    arch: 'x64',
                    asar: true,
                    'app-bundle-id': 'com.brainlabs.brainsvn',
                    'app-version': packageJson.version
                }
            }
        },
        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: '.',
                    src: ['package.json', 'settings.json', 'index.html'],
                    dest: 'build/'
                }, {
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*'],
                    dest: 'build/'
                }, {
                    expand: true,
                    cwd: 'fonts/',
                    src: ['**/*'],
                    dest: 'build/'
                }, {
                    expand: true,
                    cwd: 'resources/',
                    src: ['**/*'],
                    dest: 'build/'
                }, {
                    cwd: 'node_modules/',
                    src: Object.keys(packageJson.dependencies).map(function (dep) { return dep + '/**/*';}),
                    dest: 'build/node_modules/',
                    expand: true
                }]
            },
        },

        // styles
        less: {
            options: {
                sourceMapFileInline: true
            },
            dist: {
                files: {
                    'build/main.css': 'styles/main.less'
                }
            }
        },

        // javascript
        babel: {
            options: {
                sourceMap: 'inline',
                blacklist: 'regenerator',
                stage: 1,
                optional: ['asyncToGenerator']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.js'],
                    dest: 'build/'
                }]
            }
        },

        shell: {
            electron: {
                command: electron + ' ' + 'build',
                options: {
                    async: true,
                    execOptions: {
                        env: env
                    }
                }
            }
        },

        clean: {
            release: ['build/', 'dist/']
        },

        // livereload
        watchChokidar: {
            options: {
                spawn: true
            },
            livereload: {
                options: {livereload: true},
                files: ['build/**/*']
            },
            js: {
                files: ['src/**/*.js'],
                tasks: ['newer:babel']
            },
            less: {
                files: ['styles/**/*.less'],
                tasks: ['less']
            },
            copy: {
                files: ['index.html'],
                tasks: ['newer:copy:dev']
            }
        }
    });

    grunt.registerTask('default', ['newer:babel', 'less', 'newer:copy:dev', 'shell:electron', 'watchChokidar']);

    if (process.platform === 'win32') {
        grunt.registerTask('release', ['clean:release', 'babel', 'less', 'copy:dev', 'electron:windows', 'copy:windows', 'rcedit:exes', 'compress']);
    } else {
        grunt.registerTask('release', ['clean:release', 'babel', 'less', 'copy:dev', 'electron:osx', 'copy:osx', 'shell:sign', 'shell:zip']);
    }

    process.on('SIGINT', function () {
        grunt.task.run(['shell:electron:kill']);
        process.exit(1);
    });
};
