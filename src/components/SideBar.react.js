var _ = require('underscore');
var $ = require('jquery');
var React = require('react');
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import RepoListActions from '../actions/RepoListActions';
import RepoListStore from '../stores/RepoListStore';

var SideBar = React.createClass({
    getInitialState() {
        return RepoListStore.getState()
    },
    componentWillMount() {
        RepoListStore.listen(this.onChange)
    },
    componentWillUnmount() {
        RepoListStore.unlisten(this.onChange)
    },
    handleClick(e) {
        var siblings = e.target.siblings;
        console.log(e.target);
        if (siblings !== undefined) {
            siblings.each(function (sibling) {
                $(sibling).removeClass('active');
            });
        }
        $(e.target).addClass('active');
    },
    onChange() {
        this.setState(RepoListStore.getState())
    },
    renderRepos() {
        return this.state.repos.map((repo, i) => {
            return (
                <ListGroupItem href="#" key={i} active={i == 1} onClick={this.handleClick}>{repo}</ListGroupItem>
            )
        })
    },
    render: function () {
        return (
            <ListGroup>
                { this.renderRepos() }
            </ListGroup>
        );
    }
});

module.exports = SideBar;