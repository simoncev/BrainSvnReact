import RepoAdd from './RepoAdd.react'
var React = require('react');

var HeaderBar = React.createClass({
    render: function () {
        return (
            <div className="header">
                <div className="left-header">
                    <RepoAdd />
                </div>
                <div className="right-header">

                </div>
            </div>
        );
    }
});

export default HeaderBar;