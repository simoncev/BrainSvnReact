import alt from './alt';

class RepoListActions {
    create(path) {
        this.dispatch({});
        return {path};
    }

    add(path) {
        this.dispatch({});
        return {path};
    }
}

module.exports = alt.createActions(RepoListActions);