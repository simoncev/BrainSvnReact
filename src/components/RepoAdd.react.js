import $ from 'jquery';
var remote = require('remote');
var dialog = remote.require('dialog');
var React = require('react');
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
                    { this.state.showBubble ? <RepoAddBubble /> : null }
                </div>
            </div>
        );
    }
});

var RepoAddBubble = React.createClass({
    getInitialState: function () {
        return {option: 'add'};
    },
    handleClick: function (option) {
        this.setState({option: option});
    },
    chooseFolder: function () {

    },
    createLocalRepository: function () {

    },
    cancel: function () {

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
                    <label htmlFor="repo-add-path">Local Path</label><input type="text" placeholder="repository path" id="repo-add-path" />
                    <Button className="repo-add-header-btn" onClick={this.chooseFolder}>Choose..</Button>
                </div>
                <div className="repo-add-create-close">
                    <ButtonToolbar>
                        <Button className="repo-add-header-btn" onClick={this.createLocalRepository}>Create & Add Repository</Button>
                        <Button className="repo-add-header-btn" onClick={this.cancel}>Cancel</Button>
                    </ButtonToolbar>
                </div>
            </div>
        );
    }
});

module.exports = RepoAdd;