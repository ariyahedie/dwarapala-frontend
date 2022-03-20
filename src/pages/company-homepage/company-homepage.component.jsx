import React from "react";
import './company-homepage.styles.scss'
import config from "../../config";
import httpClient from "../../httpClient";
import { connect } from 'react-redux';

class CompanyHomepage extends React.Component {
  constructor() {
    super();

    this.state = {
      adminsList: [
        {
          id: 123,
          name: 'fuck'
        }
      ]
    }
  }

  fetchAdmins = async () => {
    const { currentUser } = this.props;
    const data = await httpClient.get(`${config.baseUrl}/admin/${currentUser.id}`);
    const { admins } = data.data
    this.setState({ adminsList: admins });
  }

  componentDidMount() {
    this.fetchAdmins();
  }

  componentDidUpdate() {
    this.fetchAdmins();
  }

  render() {
    const { adminsList } = this.state;
    return (
      <div className="company-homepage">
        {adminsList.forEach(admin => (
          <div>
            {admin.name}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});


export default connect(mapStateToProps)(CompanyHomepage);