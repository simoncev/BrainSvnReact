import alt from '../alt';
import RepoListActions from '../actions/RepoListActions'
var RepoUtil = require('../utils/RepoUtil');

class RepoListStore {
    constructor() {

        this.repos = RepoUtil.readRepos();

        this.bindListeners({
            add: RepoListActions.add
        });

    }

    add(repo) {
        this.repos.push(repo);
        RepoUtil.saveRepos(this.repos);
    }

    static all() {
        return this.getState().repos;
    }

}

export default alt.createStore(RepoListStore);