/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React from "react";
import EventsList from "../../components/home/EventsList";

const data = {
  events: {
    edges: [
      {
        node: {
          assetId: "001",
          assignee: "assignee01",
          createdDate: "2018-06-03T14:09:00.004Z",
          criticality: "CRITICAL",
          description: "description01",
          id: "evt-001",
          name: "name01",
          outcome: "RESOLVED"
        }
      },
      {
        node: {
          assetId: "002",
          assignee: "assignee02",
          createdDate: "2018-06-03T14:09:00.004Z",
          criticality: "INFO",
          description: "description02",
          id: "evt-002",
          name: "name02",
          outcome: "RESOLVED"
        }
      }
    ]
  }
};

const HomeView = () => <EventsList data={data} />;

export default HomeView;
