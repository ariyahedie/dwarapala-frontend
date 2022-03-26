import React from "react";
import './homepage.styles.scss'
import { connect } from 'react-redux';
import config from "../../config";

import SuperadminHomepage from "../superadmin-homepage/superadmin-homepage.component";
import CompanyHomepage from "../company-homepage/company-homepage.component";
import AdminHomepage from "../admin-homepage/admin-homepage.component";
import MemberHomepage from "../member-homepage/member-homepage.component";

class Homepage extends React.Component {
  renderSwitch = () => {
    const { currentUser } = this.props;
    switch(currentUser.usertype) {
      case config.usertype.company:
        return <CompanyHomepage />;
      case config.usertype.superadmin:
        return <SuperadminHomepage />;
      case config.usertype.admin:
        return <AdminHomepage />;
      case config.usertype.member:
        return <MemberHomepage />;
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