import HeaderBar from './HeaderBar.react'
import SideBar from './SideBar.react'
var React = require('react');

var Containers = React.createClass({
    render: function () {
        return (
            <div className="containers">
                <HeaderBar />
                <div className="containers-body">
                    <div className="repository sidebar">
                        <SideBar />
                    </div>
                    <div className="main-container">
                        Main Container
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Containers;