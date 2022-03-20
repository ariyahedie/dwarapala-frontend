import React from "react";
import './superadmin-homepage.styles.scss'

import CompaniesTable from "../../components/companies-table/companies-table.component";

const SuperadminHomepage = () => {
  return (
    <div className="superadmin-homepage">
      <CompaniesTable
        type="pending"
        title="Pending Companies"
      />
      <CompaniesTable
        type="reviewed"
        title="Reviewed Companies"
      />
    </div>
  );
}

export default SuperadminHomepage;