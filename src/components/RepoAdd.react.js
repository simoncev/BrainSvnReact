import $ from 'jquery';
var remote = require('remote');
var dialog = remote.require('dialog');
var React = require('react');
import repoListActions from './actions/RepoListActions';
import repoListStore from './stores/RepoListStore';

import {ButtonGroup, Button, ButtonToolbar} from 'react-bootstrap';

var RepoAdd = React.createClass({
    componentDidMount: function () {
        // Hide bubble block on click outside the block
        window.addEventListener('click', this._hideBubble, false);
    },
    componentWillUnmount() {
        // Remove click event listener on component unmount
        window.removeEventListener('click', this._hideBubble, false);
    },
    getInitialState: function () {
        return {showBubble: false}
    },
    handleClick: function () {
        this.setState({showBubble: !this.state.showBubble});
    },
    render: function () {
        return (
            <div className="repo-add">
                <div className="repo-add-plus"><i className="fa fa-plus-square repo-add-plus"
                                                  onClick={this.handleClick}></i>
                    { this.state.showBubble ? <RepoAddBubble updateState={this.handleClick}/> : null }
                </div>
            </div>
        );
    }
});

var RepoAddBubble = React.createClass({
    getInitialState: function () {
        return {
            option: 'add', folder: '',
        };
    },
    handleClick: function (option) {
        this.setState({option: option});
    },
    chooseFolder: function () {
        var folder = dialog.showOpenDialog({
            title: 'Choose Repository path',
            defaultPath: '/Users/etb/',
            properties: [ 'openDirectory' ]
        });
        this.setState({folder: folder});
    },
    changeFolder: function (e) {
        var folder = e.target.value;
        this.setState({folder: folder});
    },
    createLocalRepository: function () {
        repoListActions.add(this.state.folder);
    },
    cancel: function () {
        this.props.updateState(false);
    },
    render: function () {
        return (
            <div className="bubble">
                <div className="repo-add-header">
                    <ButtonGroup>
                        <Button className="repo-add-header-btn" active={this.state.option == 'add'}
                                onClick={this.handleClick.bind(this, 'add')}>Add</Button>
                        <Button className="repo-add-header-btn" active={this.state.option == 'create'}
                                onClick={this.handleClick.bind(this, 'create')}>Create</Button>
                        <Button className="repo-add-header-btn" active={this.state.option == 'checkout'}
                                onClick={this.handleClick.bind(this, 'checkout')}>Checkout</Button>
                    </ButtonGroup>
                </div>
                <div className="repo-add-container">
                    <label htmlFor="repo-add-path">Local Path</label><input type="text" id="repo-add-path" value={this.state.folder} onChange={this.changeFolder}/>
                    <Button className="repo-add-header-btn" onClick={this.chooseFolder}>Choose..</Button>
                </div>
                <div className="repo-add-create-close">
                    <Button className="repo-add-header-btn" onClick={this.createLocalRepository} disabled={this.state.folder == ''}>Create & Add Repository</Button>
                    <Button className="repo-add-header-btn" onClick={this.cancel}>Cancel</Button>
                </div>
            </div>
        );
    }
});

module.exports = RepoAdd;