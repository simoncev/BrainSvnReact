import $ from 'jquery';
var React = require('react');
import {ButtonGroup, Button} from 'react-bootstrap';

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
                <div className="repo-add-plus"><i className="fa fa-plus-square fa-2x repo-add-plus" onClick={this.handleClick}></i>
                    { this.state.showBubble ? <RepoAddBubble /> : null }
                </div>
            </div>
        );
    }
});

var RepoAddBubble = React.createClass({
    render: function () {
        return (
            <div className="bubble">
                <div className="repo-add-header">
                    <ButtonGroup>
                        <Button className="repo-add-header-btn">Add</Button>
                        <Button className="repo-add-header-btn">Create</Button>
                        <Button className="repo-add-header-btn">Checkout</Button>
                    </ButtonGroup>
                </div>
                <div className="repo-add-container">

                </div>
            </div>
        );
    }
});

module.exports = RepoAdd;