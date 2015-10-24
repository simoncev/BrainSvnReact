require.main.paths.splice(0, 0, process.env.NODE_PATH);
import remote from 'remote';
var Menu = remote.require('menu');
var app = remote.require('app');
import SideBar from './SideBar.react'

ReactDOM.render(
    <SideBar />,
    document.getElementById('example')
);