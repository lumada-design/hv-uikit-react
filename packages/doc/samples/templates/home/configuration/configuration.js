const configuration = {
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
      xs: "false",
      sm: "false",
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

export default configuration;
