import $ from 'jquery';
var React = require('react');
import {ButtonGroup, Button} from 'react-bootstrap';
import classnames from 'classnames';

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
    getInitialState: function () {
        return {active: true};
    },
    handleGroupClick: function(e) {
        // Getting an array of DOM elements
        // Then finding which element was clicked
        var nodes = Array.prototype.slice.call( e.currentTarget.children );
        var index = nodes.indexOf( e.target );
        this.setState({ active: index });
    },
    handleClick: function(event, selectedEvent) {
        this.setState({ active: false });
    },
    render: function () {
        let classes = classnames('repo-add-header-btn', {active: this.state.active});
        return (
            <div className="bubble">
                <div className="repo-add-header">
                    <ButtonGroup onClick={this.handleGroupClick}>
                        <Button className={classes} onClick={this.handleClick}>Add</Button>
                        <Button className="repo-add-header-btn" onClick={this.handleClick}>Create</Button>
                        <Button className="repo-add-header-btn" onClick={this.handleClick}>Checkout</Button>
                    </ButtonGroup>
                </div>
                <div className="repo-add-container">

                </div>
            </div>
        );
    }
});

module.exports = RepoAdd;