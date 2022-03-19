import React from "react";
import './companies-table.styles.scss';
import httpClient from "../../httpClient";
import config from "../../config";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 10,
  p: 4,
};

class CompaniesTable extends React.Component {
  constructor() {
    super();

    this.state = {
      open: { confirm: false, deny: false },
      company: {}
    }
  }

  handleOpen = (company, status, key) => {
    if(company.status === status) {
      this.handleClose(key);
      return;
    }
    this.setState({ company: company });
    this.setState({ open: { [key]: true } });
  }

  handleClose = (key) => {
    this.setState({ company: {} });
    this.setState({ open: { [key]: false } });
  }

  handleStatus = async (company, status, key) => {
    try{
      await httpClient.put(`${config.baseUrl}/company/${company.id}`, {
        status
      }).then(response => {
        console.log(response)
      });
    } catch (error) {
      console.error(error.message);
    }
    this.handleClose(key);
  }

  handleButtonDisability = (company, status) => {
    return (company.status === status) ? true : false;
  }

  statusColor = (status) => {
    if(status === 'pending') {
      return 'orange';
    }
    else if(status === 'denied') {
      return 'red';
    }
    else return 'green';
  }

  render (){
    const { open, company } = this.state;
    const { data, title } = this.props;
    return (
      <div className="data-table">
        <h2>{ title }</h2>
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Created At</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {
            data.map(row => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td className={`${this.statusColor(row.status)}`}>{row.status}</td>
                <td>{row.created_at}</td>
                <td>
                  <Button
                    sx={{mr: 1}}
                    onClick={() => this.handleOpen(row, 'confirmed', 'confirm')}
                    variant="contained"
                    color="success"
                    disabled={this.handleButtonDisability(row, 'confirmed')}
                  >
                    <CheckCircleIcon />
                  </Button>
                  <Modal
                    open={open.confirm}
                    onClose={() => this.handleClose('confirm')}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                        Confirm and authenticate {company.name} ?
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to authenticate {company.name} and send the activation email?
                      </Typography>
                      <Button onClick={() => this.handleStatus(company, 'confirmed', 'confirm')} variant="contained">
                        Confirm
                      </Button>
                      <Button onClick={() => this.handleClose('confirm')} variant="outlined">
                        Cancel
                      </Button>
                    </Box>
                  </Modal>
                  <Button
                    onClick={() => this.handleOpen(row, 'denied', 'deny')}
                    variant="outlined"
                    color="error"
                    disabled={this.handleButtonDisability(row, 'denied')}
                  >
                    <CancelIcon />
                  </Button>
                  <Modal
                    open={open.deny}
                    onClose={() => this.handleClose('deny')}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                        Deny {company.name} ?
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to deny {company.name} and send the email?
                      </Typography>
                      <Button onClick={() => this.handleStatus(company, 'denied', 'deny')} variant="contained">
                        Deny
                      </Button>
                      <Button onClick={() => this.handleClose('deny')} variant="outlined">
                        Cancel
                      </Button>
                    </Box>
                  </Modal>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default CompaniesTable;