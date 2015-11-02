var _ = require('underscore');
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
    onChange() {
        this.setState(RepoListStore.getState())
    },
    renderRepos() {
        return this.state.repos.map((repo, i) => {
            return (
                <ListGroupItem href="#" active key={i}>{repo}</ListGroupItem>
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