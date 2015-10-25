require.main.paths.splice(0, 0, process.env.NODE_PATH);
import remote from 'remote';
var app = remote.require('app');
import Containers from './components/Containers.react'
var Menu = remote.require('menu');
var template = require('./menu');

Menu.setApplicationMenu(Menu.buildFromTemplate(template()));

ReactDOM.render(
    <Containers />,
    document.getElementById('example')
);