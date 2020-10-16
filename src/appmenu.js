exports.appMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: "New",
                click(item, focusedWindow) {
                    focusedWindow.webContents.send('action', 'new');
                },
                accelerator: 'CmdOrCtrl+N'
            },
            {
                label: "Open",
                click(item, focusedWindow){
                    focusedWindow.webContents.send('action', 'open');
                },
                accelerator: 'CmdOrCtrl+O'
            },
            {
                label: "Save",
                click(item, focusedWindow){
                    focusedWindow.webContents.send('action', 'save'); 
                },
                accelerator: 'CmdOrCtrl+S'
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {
                role: 'undo'
            },
            {
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                role: 'cut'
            },
            {
                role: 'copy'
            },
            {
                role: 'paste'
            },
            {
                role: 'pasteandmatchstyle'
            },
            {
                role: 'delete'
            },
            {
                role: 'selectall'
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                role: 'reload'
            },
            {
                role: 'forcereload'
            },
            {
                role: 'toggledevtools'
            },
            {
                type: 'separator'
            },
            {
                role: 'resetzoom'
            },
            {
                role: 'zoomin'
            },
            {
                role: 'zoomout'
            },
            {
                type: 'separator'
            },
            {
                role: 'togglefullscreen'
            }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Home Page',
                click() { require('electron').shell.openExternal('http://www.baidu.com'); }
            }
        ]
    }
];