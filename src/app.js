import remote from 'remote';
var Menu = remote.require('menu');
var template = require('./menu');
var React = require('react');
var ReactDOM = require('react-dom');
import Containers from './components/Containers.react'

Menu.setApplicationMenu(Menu.buildFromTemplate(template()));

ReactDOM.render(
    <Containers />,
    document.getElementById('body-content')
);