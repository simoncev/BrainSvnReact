import alt from '../alt';
import RepoListActions from '../actions/RepoListActions'

class RepoListStore {
    constructor() {

        this.repos = [];

        this.bindListeners({
            add: RepoListActions.add
        });

    }

    add(repo) {
        this.repos.push(repo);
    }

    static all() {
        return this.getState().repos;
    }

}

export default alt.createStore(RepoListStore);