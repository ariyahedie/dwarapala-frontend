import React from "react";
import './superadmin-homepage.styles.scss'
import config from "../../config";

import CompaniesTable from "../../components/companies-table/companies-table.component";
import httpClient from "../../httpClient";

class SuperadminHomepage extends React.Component {

  constructor() {
    super();

    this.state = {
      companiesList: [],
      pendingCompaniesList: [],
      reviewedCompaniesList: []
    }
  }

  fetchCompanies = async () => {
    const data = await httpClient.get(`${config.baseUrl}/company`);
    const { companies } = data.data
    this.setState({ 
      companiesList: companies,
      pendingCompaniesList: companies.filter(company => (
        company.status === 'pending'
      )),
      reviewedCompaniesList: companies.filter(company => (
        company.status !== 'pending'
      ))
    });
  }

  componentDidMount() {
    this.fetchCompanies();
  }

  componentDidUpdate() {
    this.fetchCompanies();
  }

  render() {
    const { reviewedCompaniesList, pendingCompaniesList } = this.state;
    return (
      <div className="homepage">
        {
          (pendingCompaniesList.length > 0) ? (
            <CompaniesTable
              data={pendingCompaniesList}
              title="Pending Companies"
            />
          ) : null
        }
        {
          (reviewedCompaniesList.length > 0) ? (
            <CompaniesTable
              data={reviewedCompaniesList}
              title="Reviewed Companies"
            />
          ) : null
        }
      </div>
    );
  }
}

export default SuperadminHomepage;