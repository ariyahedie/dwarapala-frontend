import React from "react";
import './members-log-table.styles.scss';
import httpClient from "../../httpClient";
import config from "../../config";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";

class MembersLogTable extends React.Component {
  constructor() {
    super();

    this.state = {
      logsList: [],
      membersList: []
    }
  }

  fetchLogs = async () => {
    try {
      const response = await httpClient.get(`${config.baseUrl}/logs`);
      this.setState({ logsList: response.data.logs });
    } catch (error) {
      console.error(error);
    }
  }

  fetchMembers = async () => {
    try {
      const response = await httpClient.get(`${config.baseUrl}/member/${this.props.currentUser.company}`);
      this.setState({ membersList: response.data.members });
    } catch (error) {
      console.error(error);
    }
  }

  getMember = (log, key) => {
    const { membersList } = this.state;
    const member = membersList.find(member => (
      member.id === log.member_id
    ));
    if (member === undefined) return;
    return member[key];
  }

  convertToWIB = (utcString) => {
    const date = new Date(utcString);
    return date.toString();
  }

  componentDidMount() {
    this.fetchLogs();
    this.fetchMembers();
  }

  render (){
    const { logsList } = this.state;
    return (
      <div className={`log-table-wrapper ${logsList.length === 0 ? 'hidden' : ''}`}>
        <h2>Members Log</h2>
        <table className="log-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody className="body">
          {
            logsList.map(log => (
              <tr key={log.id}>
                <td>{this.getMember(log, 'name')}</td>
                <td>{this.getMember(log, 'email')}</td>
                <td>{this.convertToWIB(log.time)}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(MembersLogTable);