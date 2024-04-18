import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const departureColumns = [
  columnHelper.accessor("userName", {
    cell: (info) => info.getValue(),
    header: "GUEST",
  }),

  columnHelper.accessor("configuration", {
    cell: (info) => info.getValue(),
    header: "CONF#"
  }),

  columnHelper.accessor("noOfRooms", {
    cell: (info) => info.getValue(),
    header: "ROOM",
    meta: {
      isNumeric: false
    }
  }),

  columnHelper.accessor("bookingStatus", {
    cell: (info) => info.getValue(),
    header: "STATUS",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("last4digits", {
    cell: (info) => info.getValue(),
    header: "Card Number",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("exp_month", {
    cell: (info) => info.getValue(),
    header: "Expiry Month",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("exp_year", {
    cell: (info) => info.getValue(),
    header: "expiry year",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("brand", {
    cell: (info) => info.getValue(),
    header: "Brand",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("country", {
    cell: (info) => info.getValue(),
    header: "Country",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: "",
    meta: {
      dropDown: true
    }
  }),
]
export const bookingColumn = [
  columnHelper.accessor("userName", {
    cell: (info) => info.getValue(),
    header: "GUEST",
  }),
  columnHelper.accessor("configuration", {
    cell: (info) => info.getValue(),
    header: "CONF#"
  }),
  columnHelper.accessor("noOfRooms", {
    cell: (info) => info.getValue(),
    header: "ROOM",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("bookingStatus", {
    cell: (info) => info.getValue(),
    header: "STATUS",
    meta: {
      isNumeric: false
    }
  }),
  // columnHelper.accessor("cardDetails", {
  //   cell: (info) => info.getValue(),
  //   header: "CARD",
  //   meta: {
  //     isNumeric: false
  //   }
  // }),

  columnHelper.accessor("last4digits", {
    cell: (info) => info.getValue(),
    header: "Card Number",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("exp_month", {
    cell: (info) => info.getValue(),
    header: "Expiry Month",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("exp_year", {
    cell: (info) => info.getValue(),
    header: "expiry year",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("brand", {
    cell: (info) => info.getValue(),
    header: "Brand",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("country", {
    cell: (info) => info.getValue(),
    header: "Country",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: "",
    meta: {
      dropDown: true
    }
  }),
]
export const tomorrowArrivalsDetailsColumn = [
  columnHelper.accessor("userName", {
    cell: (info) => info.getValue(),
    header: "GUEST",
  }),
  columnHelper.accessor("configuration", {
    cell: (info) => info.getValue(),
    header: "CONF#"
  }),
  columnHelper.accessor("noOfRooms", {
    cell: (info) => info.getValue(),
    header: "ROOM",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("bookingStatus", {
    cell: (info) => info.getValue(),
    header: "STATUS",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("last4digits", {
    cell: (info) => info.getValue(),
    header: "Card Number",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("exp_month", {
    cell: (info) => info.getValue(),
    header: "Expiry Month",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("exp_year", {
    cell: (info) => info.getValue(),
    header: "expiry year",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("brand", {
    cell: (info) => info.getValue(),
    header: "Brand",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("country", {
    cell: (info) => info.getValue(),
    header: "Country",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: "",
    meta: {
      dropDown: true
    }
  }),
]
export const tomorrowDepartureDetailsColumn = [
  columnHelper.accessor("userName", {
    cell: (info) => info.getValue(),
    header: "GUEST",
  }),
  columnHelper.accessor("configuration", {
    cell: (info) => info.getValue(),
    header: "CONF#"
  }),
  columnHelper.accessor("noOfRooms", {
    cell: (info) => info.getValue(),
    header: "ROOM",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("bookingStatus", {
    cell: (info) => info.getValue(),
    header: "STATUS",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("last4digits", {
    cell: (info) => info.getValue(),
    header: "Card Number",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("exp_month", {
    cell: (info) => info.getValue(),
    header: "Expiry Month",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("exp_year", {
    cell: (info) => info.getValue(),
    header: "expiry year",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("brand", {
    cell: (info) => info.getValue(),
    header: "Brand",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("country", {
    cell: (info) => info.getValue(),
    header: "Country",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: "",
    meta: {
      dropDown: true
    }
  }),
]
export const columns = [
  columnHelper.accessor("guest", {
    cell: (info) => info.getValue(),
    header: "GUEST",
  }),
  columnHelper.accessor("conf", {
    cell: (info) => info.getValue(),
    header: "CONF#"
  }),
  columnHelper.accessor("room", {
    cell: (info) => info.getValue(),
    header: "ROOM",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("status", {
    cell: (info) => info.getValue(),
    header: "STATUS",
    meta: {
      isNumeric: false
    }
  }),
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: "",
    meta: {
      dropDown: true
    }
  })
];

