import RepoAdd from './RepoAdd.react'

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

module.exports = HeaderBar;