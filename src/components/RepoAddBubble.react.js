var React = require('react');
var remote = require('remote');
var dialog = remote.require('dialog');
import RepoListActions from '../actions/RepoListActions';
import RepoListStore from '../stores/RepoListStore';
import RepoUtil from '../utils/RepoUtil';

import {ButtonGroup, Button, ButtonToolbar} from 'react-bootstrap';

var RepoAddBubble = React.createClass({
    getInitialState: function () {
        return {
            option: 'add', folder: '', repo: null
        };
    },
    handleClick: function (option) {
        this.setState({option: option});
    },
    chooseFolder: function () {
        var folder = dialog.showOpenDialog({
            title: 'Choose Repository path',
            defaultPath: '/Users/etb/',
            properties: ['openDirectory']
        });
        var repo = RepoUtil.getSvnInfo(folder);
        if (repo !== false) {
            this.setState({repo: repo, error: false});
        } else {
            this.setState({error: true});
        }
        this.setState({folder: folder});
    },
    changeFolder: function (e) {
        var folder = e.target.value;
        this.setState({folder: folder});
    },
    createLocalRepository: function () {
        RepoListActions.add(this.state.repo);
        this.props.updateState(false);
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
                    <label htmlFor="repo-add-path">Local Path</label><input type="text" id="repo-add-path"
                                                                            value={this.state.folder}
                                                                            onChange={this.changeFolder}/>
                    <Button className="repo-add-header-btn" onClick={this.chooseFolder}>Choose..</Button>
                    { this.state.error ?
                        <div className="repo-add-header-error">This directory does not appear to be an svn
                            repository<br/>
                            Would you like to create a repository here instead?</div> : null }
                </div>
                <div className="repo-add-create-close">
                    <Button className="repo-add-header-btn" onClick={this.createLocalRepository}
                            disabled={this.state.repo == null}>Create & Add Repository</Button>
                    <Button className="repo-add-header-btn" onClick={this.cancel}>Cancel</Button>
                </div>
            </div>
        );
    }
});

module.exports = RepoAddBubble;