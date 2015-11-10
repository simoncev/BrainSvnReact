var _ = require('underscore');
var $ = require('jquery');
var React = require('react');
var remote = require('remote');
var Menu = remote.require('menu');
var MenuItem = remote.require('menu-item');
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import RepoListActions from '../actions/RepoListActions';
import RepoListStore from '../stores/RepoListStore';

var addMenu;
var menu = new Menu();

var RepoListView = React.createClass({
    getInitialState() {
        return RepoListStore.getState()
    },
    componentWillMount() {
        RepoListStore.listen(this.onChange);
        menu.append(new MenuItem({ label: 'Update', click: function() { console.log('Update'); } }));
        menu.append(new MenuItem({ label: 'Merge', click: function() { console.log('Merge'); } }));
        menu.append(new MenuItem({ label: 'Commit', click: function() { console.log('Commit'); } }));
        menu.append(new MenuItem({ label: 'Switch', click: function() { console.log('Switch'); } }));
    },
    componentWillUnmount() {
        RepoListStore.unlisten(this.onChange)
    },
    contextMenu(e) {
        e.preventDefault();
        menu.popup(e.clientX, e.clientY);
    },
    handleClick(e) {
        var siblings = e.target.siblings;
        console.log(e.target);
        if (siblings !== undefined) {
            siblings.each(function (sibling) {
                $(sibling).removeClass('selected');
            });
        }
        $(e.target).addClass('selected');
    },
    onChange() {
        this.setState(RepoListStore.getState());
    },
    renderRepos() {
        console.log(this.state.repos);
        return this.state.repos.map((repo, i) => {
            return (
                <li className='repo-list-tree-item' key={i} active={i == 1} onClick={this.handleClick} onContextMenu={this.contextMenu} data-repo-path={repo.path}>{repo.name}</li>
            )
        })
    },
    render: function () {
        return (
            <ol className="repo-list-tree">
                { this.renderRepos() }
            </ol>
        );
    }
});

export default RepoListView;