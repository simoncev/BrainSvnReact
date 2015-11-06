import alt from '../alt';
import RepoListActions from '../actions/RepoListActions'
var RepoUtil = require('../utils/RepoUtil');

class RepoListStore {
    constructor() {

        this.repos = [];

        this.bindListeners({
            add: RepoListActions.add
        });

    }

    add(repoPath) {
        this.repos.push(repoPath);
    }

    static all() {
        return this.getState().repos;
    }

}

export default alt.createStore(RepoListStore);