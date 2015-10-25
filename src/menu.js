var MenuTemplate = function() {
    return [
        {
            label: 'BrainSvn',
            submenu: [
                {
                    label: 'Quit BrainSvn',
                    accelerator: 'Cmd+Q',
                    click: function() {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'File',
            submenu: [
                {
                    label: 'New Repository',
                    accelerator: 'Cmd+N',
                },
                {
                    label: 'New Branch',
                    accelerator: 'Cmd+Shift+N',
                },
                {
                    label: 'New Window',
                    accelerator: 'Alt+Cmd+N',
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Clone Repository',
                    accelerator: 'Ctrl+Cmd+O',
                },
                {
                    label: 'Add Local Repository',
                    accelerator: 'Cmd+O',
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Open Recent',
                },
                {
                    label: 'Reload Repositories',
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Close',
                    accelerator: 'Cmd+W',
                }
            ],
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Undo',
                    accelerator: 'CmdOrCtrl+Z',
                    role: 'undo'
                },
                {
                    label: 'Redo',
                    accelerator: 'Shift+CmdOrCtrl+Z',
                    role: 'redo'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Cut',
                    accelerator: 'CmdOrCtrl+X',
                    role: 'cut'
                },
                {
                    label: 'Copy',
                    accelerator: 'CmdOrCtrl+C',
                    role: 'copy'
                },
                {
                    label: 'Paste',
                    accelerator: 'CmdOrCtrl+V',
                    role: 'paste'
                },
                {
                    label: 'Select All',
                    accelerator: 'CmdOrCtrl+A',
                    role: 'selectall'
                },
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Uncommited Changes',
                    accelerator: 'CmdOrCtrl+1'
                },
                {
                    label: 'History',
                    accelerator: 'CmdOrCtrl+2'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Go to Commit Message',
                    accelerator: 'Cmd+Shift+C'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Hide Repository List',
                    accelerator: 'Cmd+Shift+R'
                },
                {
                    label: 'Go to Filter Repositories',
                    accelerator: 'Cmd+Shift+O'
                },
            ]
        },
        {
            label: 'Repository',
            submenu: [
                {
                    label: 'Show Branches',
                    accelerator: 'Cmd+B',
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Sync',
                    accelerator: 'Cmd+S'
                },
                {
                    label: 'Push',
                    accelerator: 'Cmd+P'
                },
                {
                    label: 'Pull',
                    accelerator: 'Cmd+Shift+P'
                },
            ],
        },
        {
            label: 'Branch',
        },
        {
            label: 'Window',
            role: 'window',
            submenu: [
                {
                    label: 'Minimize',
                    accelerator: 'CmdOrCtrl+M',
                    role: 'minimize'
                },
                {
                    label: 'Close',
                    accelerator: 'CmdOrCtrl+W',
                    role: 'close'
                },
            ]
        },
        {
            label: 'Help',
            role: 'help',
            submenu: [
                {
                    label: 'Learn More',
                    click: function() { require('shell').openExternal('http://electron.atom.io') }
                },
            ]
        },
    ];
};

module.exports = MenuTemplate;