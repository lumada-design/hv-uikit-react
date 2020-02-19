/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const assetInventoryConfiguration = {
  /**
   * Defines the filter and sort fields.
   */
  metadata: [
    {
      id: "id1",
      accessor: "headerTitle",
      cellType: "alpha-numeric",
      searchable: true,
      sortable: true,
      sortableLabelAsc: "Title ascending",
      sortableLabelDesc: "Title descending"
    },
    {
      id: "id3",
      accessor: "probability",
      cellType: "numeric",
      searchable: true,
      sortable: true,
      sortableLabelAsc: "Probability ascending",
      sortableLabelDesc: "Probability descending"
    },
    {
      id: "id4",
      accessor: "timeHorizon",
      cellType: "numeric",
      sortable: true,
      sortableLabelAsc: "TimeHorizon ascending",
      sortableLabelDesc: "TimeHorizon descending"
    },
    {
      id: "id4",
      accessor: "event.schedule",
      cellType: "alpha-numeric",
      searchable: true
    }
  ],
  /**
   * Configuration of the views.
   */
  viewConfiguration: {
    /**
     * Card.
     */
    breakpoints: {
      xs: false,
      sm: false,
      md: 4,
      lg: 3,
      xl: 3
    },
    /**
     * List.
     */
    columnConfiguration: [
      {
        title: "Status",
        style: {
          paddingLeft: "8px",
          minWidth: "52px"
        },
        align: "left"
      },
      {
        title: "Event",
        style: {
          minWidth: "570px"
        },
        align: "left"
      },
      {
        title: "Probability",
        style: {
          minWidth: "93px"
        },
        align: "right"
      },
      {
        title: "Time horizon",
        style: {
          minWidth: "108px"
        },
        align: "right"
      },
      {
        title: "Related Assets",
        style: {
          minWidth: "195px",
          paddingLeft: "30px"
        },
        align: "left"
      }
    ]
  }
};

export default assetInventoryConfiguration;
