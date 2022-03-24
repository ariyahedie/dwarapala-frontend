import React from "react";
import './company-homepage.styles.scss';

import MembersTable from "../../components/members-table/members-table.component";

const CompanyHomepage = () => {
  return (
    <div className="company-homepage">
      <MembersTable type="admin" />
      <MembersTable type="member" />
    </div>
  );
}

export default CompanyHomepage;