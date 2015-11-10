import $ from 'jquery';
var remote = require('remote');
var dialog = remote.require('dialog');
var React = require('react');
import RepoListActions from '../actions/RepoListActions';
import RepoListStore from '../stores/RepoListStore';

var Repo = React.createClass({
    render() {
        return (
            <ListGroupItem key={i} active={i == 1} onClick={this.handleClick}>{repo}</ListGroupItem>
        )
    }
});

export default Repo;