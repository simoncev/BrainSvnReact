import remote from 'remote';

var Header = React.createClass({
    handleClose: function () {
        if (util.isWindows()) {
            remote.getCurrentWindow().close();
        } else {
            remote.getCurrentWindow().hide();
        }
    },
    handleMinimize: function () {
        remote.getCurrentWindow().minimize();
    },
    handleFullscreen: function () {
        if (util.isWindows()) {
            if (remote.getCurrentWindow().isMaximized()) {
                remote.getCurrentWindow().unmaximize();
            } else {
                remote.getCurrentWindow().maximize();
            }
            this.setState({
                fullscreen: remote.getCurrentWindow().isMaximized()
            });
        } else {
            remote.getCurrentWindow().setFullScreen(!remote.getCurrentWindow().isFullScreen());
            this.setState({
                fullscreen: remote.getCurrentWindow().isFullScreen()
            });
        }
    },
    handleFullscreenHover: function () {
        this.update();
    },
    renderLogo: function () {
        return (
            <div className="logo">
                <RetinaImage src="logo.png"/>
            </div>
        );
    },
    renderWindowButtons: function () {
        let buttons;
        if (util.isWindows()) {
            buttons = (
                <div className="windows-buttons">
                    <div className="windows-button button-minimize enabled" onClick={this.handleMinimize}><div className="icon"></div></div>
                    <div className={`windows-button ${this.state.fullscreen ? 'button-fullscreenclose' : 'button-fullscreen'} enabled`} onClick={this.handleFullscreen}><div className="icon"></div></div>
                    <div className="windows-button button-close enabled" onClick={this.handleClose}></div>
                </div>
            );
        } else {
            buttons = (
                <div className="buttons">
                    <div className="button button-close enabled" onClick={this.handleClose}></div>
                    <div className="button button-minimize enabled" onClick={this.handleMinimize}></div>
                    <div className="button button-fullscreen enabled" onClick={this.handleFullscreen}></div>
                </div>
            );
        }
        return buttons;
    },
    renderDashboardHeader: function () {
        let headerClasses = classNames({
            bordered: !this.props.hideLogin,
            header: true,
            'no-drag': true
        });
        let username;
        if (this.props.hideLogin) {
            username = null;
        } else if (this.state.username) {
            username = (
                <div className="login-wrapper">
                    <div className="login no-drag">
                        <span className="icon icon-user"></span>
              <span className="text">
                {this.state.username}
                  {this.state.verified ? null : '(Unverified)'}
              </span>
                        <RetinaImage src="userdropdown.png"/>
                    </div>
                </div>
            );
        } else {
            username = (
                <div className="login-wrapper">
                    <div className="login no-drag">
                        <span className="icon icon-user"></span> LOGIN
                    </div>
                </div>
            );
        }
        let updateWidget = this.state.updateAvailable && !this.props.hideLogin ? <a className="btn btn-action small no-drag" onClick={this.handleAutoUpdateClick}>UPDATE NOW</a> : null;
        return (
            <div className={headerClasses}>
                <div className="left-header">
                    {util.isWindows () ? this.renderLogo() : this.renderWindowButtons()}
                    {username}
                </div>
                <div className="right-header">
                    <div className="updates">
                        {updateWidget}
                    </div>
                    {util.isWindows () ? this.renderWindowButtons() : this.renderLogo()}
                </div>
            </div>
        );
    },
    renderBasicHeader: function () {
        let headerClasses = classNames({
            bordered: !this.props.hideLogin,
            header: true,
            'no-drag': true
        });
        return (
            <div className={headerClasses}>
                <div className="left-header">
                    {util.isWindows () ? null : this.renderWindowButtons()}
                </div>
                <div className="right-header">
                    {util.isWindows () ? this.renderWindowButtons() : null}
                </div>
            </div>
        );
    },
    render: function () {
        if (this.props.hideLogin) {
            return this.renderBasicHeader();
        } else {
            return this.renderDashboardHeader();
        }
    }
});

module.exports = Header;