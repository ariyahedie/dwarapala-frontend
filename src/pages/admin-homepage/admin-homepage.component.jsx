import React from 'react';
import './admin-homepage.styles.scss';
import { Link } from 'react-router-dom';

import MembersTable from '../../components/members-table/members-table.component';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import Button from '@mui/material/Button';
import MembersLogTable from '../../components/members-log-table/members-log-table.component';

class AdminHomepage extends React.Component {
  render() {
    return (
      <div className='admin-homepage'>
        <Link className="open-camera" to="/camera">
          <Button
            variant="outlined"
            startIcon={<VideoCameraFrontIcon />}
            sx={{ float: 'right' }}
          >
            Open Camera
          </Button>
        </Link>
        <MembersLogTable />
        <MembersTable type="member" />
      </div>
    );
  }
}

export default AdminHomepage;