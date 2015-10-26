import HeaderBar from './HeaderBar.react'
import SideBar from './SideBar.react'

var Containers = React.createClass({
    handleClickDockerTerminal: function () {
        metrics.track('Opened Docker Terminal', {
            from: 'app'
        });
        machine.dockerTerminal();
    },
    handleClickReportIssue: function () {
        metrics.track('Opened Issue Reporter', {
            from: 'app'
        });
        shell.openExternal('https://github.com/kitematic/kitematic/issues/new');
    },
    handleClickPreferences: function () {
        metrics.track('Opened Preferences', {
            from: 'app'
        });
        this.context.router.transitionTo('preferences');
    },
    handleScroll: function (e) {
        if (e.target.scrollTop > 0 && !this.state.sidebarOffset) {
            this.setState({
                sidebarOffset: e.target.scrollTop
            });
        } else if (e.target.scrollTop === 0 && this.state.sidebarOffset) {
            this.setState({
                sidebarOffset: 0
            });
        }
    },
    render: function () {
        return (
            <div className="containers">
                <HeaderBar />
                <div className="containers-body">
                    <div className="sidebar">
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