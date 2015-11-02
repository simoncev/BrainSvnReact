import alt from './alt';
import RepoListActions from '../actions/RepoListActions'

class RepoListStore {
    constructor() {
        this.bindActions(RepoListActions);

        this.bindListeners({
            create: RepoListActions.create,
            add: RepoListActions.add
        });

        this.state = {
            repos: []
        };
    }

    static all () {
       return this.state.repos;
    }

}

export default alt.createStore(RepoListStore);