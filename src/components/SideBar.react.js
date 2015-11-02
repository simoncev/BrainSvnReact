var React = require('react');
import repoListActions from './actions/RepoListActions';
import repoListStore from './stores/RepoListStore';

var SideBar = React.createClass({
    getInitialState() {
      return {
          repos: repoListStore.all()
      }
    },
    render: function () {
        var repos = _.map(this.repos, (repo) => {
            return (
                <ListGroupItem href="#" active>{repo}</ListGroupItem>
            );
        });

        return (
            <ListGroup>
                {repos}
            </ListGroup>
        );
    }
});

module.exports = SideBar;