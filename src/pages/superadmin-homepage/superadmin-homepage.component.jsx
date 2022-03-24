import React from "react";
import './superadmin-homepage.styles.scss'
import httpClient from "../../httpClient";
import config from "../../config";

import CompaniesTable from "../../components/companies-table/companies-table.component";

class SuperadminHomepage extends React.Component {
  constructor() {
    super();

    this.state = {
      companiesList: []
    }
  }

  fetchCompanies = async () => {
    try {
      const data = await httpClient.get(`${config.baseUrl}/company`);
      const { companies } = data.data;
      this.setState({ companiesList: companies });
    } catch (error) {
      console.error(error);
    }
  }
  
  componentDidMount() {
    this.fetchCompanies();
  }
  
  render() {
    const { companiesList } = this.state;
    return (
      <div className="superadmin-homepage">
        <CompaniesTable
          type="pending"
          title="Pending Companies"
          fetchCompanies={this.fetchCompanies}
          companiesList={companiesList.filter(company => (
            company.status === 'pending'
          ))}
        />
        <CompaniesTable
          type="reviewed"
          title="Reviewed Companies"
          fetchCompanies={this.fetchCompanies}
          companiesList={companiesList.filter(company => (
            company.status !== 'pending'
          ))}
        />
      </div>
    );
  }
}

export default SuperadminHomepage;