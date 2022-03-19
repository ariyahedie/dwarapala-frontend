import React from "react";
import './homepage.styles.scss'
import { connect } from 'react-redux';

import SuperadminHomepage from "../superadmin-homepage/superadmin-homepage.component";
import config from "../../config";

class Homepage extends React.Component {
  renderSwitch = () => {
    const { currentUser } = this.props;
    switch(currentUser.usertype) {
      case config.usertype.company:
        return 'bar';
      case config.usertype.superadmin:
        return <SuperadminHomepage />;
      case config.usertype.admin:
        return 'bar';
      case config.usertype.member:
        return 'bar';
      default:
        return '';
    }
  }

  render() {
    return (
      <div className="homepage">
        { this.renderSwitch() }
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(Homepage);