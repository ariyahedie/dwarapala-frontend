import React from 'react';
import './admin-homepage.styles.scss';

import MembersTable from '../../components/members-table/members-table.component';

class AdminHomepage extends React.Component {

  render() {
    return (
      <div className='admin-homepage'>
        <MembersTable type="member" />
      </div>
    );
  }
}

export default AdminHomepage;