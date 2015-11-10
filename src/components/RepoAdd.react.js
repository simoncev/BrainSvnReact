import $ from 'jquery';
var React = require('react');
import RepoListActions from '../actions/RepoListActions';
import RepoListStore from '../stores/RepoListStore';
import RepoAddBubble from './RepoAddBubble.react';

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
        return {
            showBubble: false,
            repos: RepoListStore.getState()
        }
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

export default RepoAdd;