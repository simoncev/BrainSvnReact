import alt from '../alt';

class RepoListActions {

    add(path) {
        this.dispatch(path);
    }
}

export default alt.createActions(RepoListActions);