import alt from '../alt';

class RepoListActions {

    add(repo) {
        this.dispatch(repo);
    }
}

export default alt.createActions(RepoListActions);