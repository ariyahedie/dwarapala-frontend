import React from 'react';
import { connect } from 'react-redux';
import config from '../../config';

import CompanyProfile from '../company-profile/company-profile.component';
import SuperadminProfile from '../superadmin-profile/superadmin-profile.component';
import AdminProfile from '../admin-profile/admin-profile.component';
import MemberProfile from '../member-profile/member-profile.component';

const ProfilePage = ({ currentUser }) => {
  const renderSwitch = () => {
    switch(currentUser.usertype) {
      case config.usertype.company:
        return <CompanyProfile />;
      case config.usertype.superadmin:
        return <SuperadminProfile />;
      case config.usertype.admin:
        return <AdminProfile />;
      case config.usertype.member:
        return <MemberProfile />;
      default:
        return '';
    }
  }

  return (
    <div className="edit-profile">
      { renderSwitch() }
    </div>
  );
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(ProfilePage);