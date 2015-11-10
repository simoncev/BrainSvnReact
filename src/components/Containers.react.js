import HeaderBar from './HeaderBar.react'
import RepoListView from './RepoListView.react'
var React = require('react');

var Containers = React.createClass({
    render: function () {
        var divStyle = {
            width: 200
        };
        return (
            <div className="containers">
                <HeaderBar />
                <div className="containers-body">
                    <div className="repo-list-tree-view" style={divStyle}>
                        <RepoListView />
                    </div>
                    <div className="main-container">
                        Main Container
                    </div>
                </div>
            </div>
        );
    }
});

export default Containers;