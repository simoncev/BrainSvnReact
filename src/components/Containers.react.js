import Header from './Header.react'

var Containers = React.createClass({
    render: function () {
        var sidebarHeaderClass = 'sidebar-header';
        //if (this.state.sidebarOffset) {
        //    sidebarHeaderClass += ' sep';
        //}
        return (
            <div className="containers">
                <Header />
                <div className="containers-body">
                    <div className="sidebar">
                        <section className={sidebarHeaderClass}>
                            <h4>Containers</h4>
                            <div className="create">
                            </div>
                        </section>
                        <section className="sidebar-containers" onScroll={this.handleScroll}>
                            <ContainerList containers={this.state.sorted} newContainer={this.state.newContainer} />
                        </section>
                        <section className="sidebar-buttons">
                            <span className="btn-sidebar btn-terminal" onClick={this.handleClickDockerTerminal} onMouseEnter={this.handleMouseEnterDockerTerminal} onMouseLeave={this.handleMouseLeaveDockerTerminal}><span className="icon icon-docker-cli"></span><span className="text">DOCKER CLI</span></span>
                            <span className="btn-sidebar btn-feedback" onClick={this.handleClickReportIssue} onMouseEnter={this.handleMouseEnterDockerTerminal} onMouseLeave={this.handleMouseLeaveDockerTerminal}><span className="icon icon-feedback"></span></span>
                            <span className="btn-sidebar btn-preferences" onClick={this.handleClickPreferences} onMouseEnter={this.handleMouseEnterDockerTerminal} onMouseLeave={this.handleMouseLeaveDockerTerminal}><span className="icon icon-preferences"></span></span>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Containers;