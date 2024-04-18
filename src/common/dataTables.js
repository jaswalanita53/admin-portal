import * as React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Input,
  Box,
  InputGroup,
  InputRightElement,
  Tfoot,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { FaChevronDown, FaPrint, FaSearch } from "react-icons/fa";
import LoadSpinner from "./LoadSpinner";

export function DataTable({
  data,
  columns,
  searchBox = false,
  tdp,
  tdborderX,
  // textAlign,
  loading,
  topheader,
  showtopheader,
  borderColor,
  shouldbordershow,
}) {
  const [searchedVal, setSearchedVal] = React.useState("");
  const [sorting, setSorting] = React.useState([]);
  const [tableRowsData, setTableRowData] = React.useState([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const handlePrintConfirmation = (row) => {
    let htmlContent = '<html><head><title>Print Confirmation</title></head><body>';
    for (const key in row) {
      if (row.hasOwnProperty(key)) {
        const value = row[key];
        if (typeof value === 'object' && value.props && value.props.children) {
          const childrenArray = value.props.children;
          const textContent = childrenArray.join('').trim();
          htmlContent += `<p>${key}: ${textContent}</p>`;
        } else {
          htmlContent += `<p>${key}: ${value}</p>`;
        }
      }
    }
    htmlContent += '</body></html>';
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(htmlContent);
    iframeDoc.close();
    iframe.contentWindow.print();
    document.body.removeChild(iframe);
  }

  React.useEffect(() => {
    if (searchBox) {
      setTableRowData(
        table
          .getRowModel()
          .rows.filter(
            (row) =>
              !searchedVal?.length ||
              row.original.userName
                .toString()
                .toLowerCase()
                .includes(searchedVal.toString().toLowerCase())
          )
      );
    } else {
      setTableRowData(table.getRowModel().rows);
    }
  }, [searchBox, searchedVal, data]);

  return (
    <div>
      {searchBox && (
        <Box style={dataTableSearchContainer}>
          <InputGroup
            size="md"
            display="flex"
            position="relative"
            h="fit-content"
          >
            <Input
              placeholder="Guest Name"
              onChange={(e) => setSearchedVal(e.target.value)}
              fontSize="xs"
              style={searchInputDataTable}
            />
            <InputRightElement style={search}>
              <FaSearch />
            </InputRightElement>
          </InputGroup>
        </Box>
      )}
      {loading ? (
        <LoadSpinner />
      ) : (
        <Table p="0">
          <Thead>
            {showtopheader && (
              <Tr>
                {topheader?.map((value, index) => (
                  <Th
                    colSpan={value.colspan}
                    border="1px"
                    borderColor={"#e2e8f0"}
                    key={String(value?.heading) + String(index)}
                  >
                    {value?.heading}
                  </Th>
                ))}
              </Tr>
            )}
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  const meta = header.column.columnDef.meta;
                  return (
                    <Th
                      fontSize="xs"
                      fontWeight={"700"}
                      paddingLeft="17px"
                      key={String(header.id) + String(index)}
                      onClick={header.column.getToggleSortingHandler()}
                      isNumeric={meta?.isNumeric}
                      padding={tdp}
                      // textAlign={textAlign}
                      border={shouldbordershow ? "1px" : "0"}
                      borderColor={"#e2e8f0"}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      <chakra.span>
                        {header.column.getIsSorted() ? (
                          header.column.getIsSorted() === "desc" ? (
                            <TriangleDownIcon aria-label="sorted descending" />
                          ) : (
                            <TriangleUpIcon aria-label="sorted ascending" />
                          )
                        ) : null}
                      </chakra.span>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table?.getRowModel()?.rows?.length > 0 ? (
              ""
            ) : (
              <Tr className={customaligncenter} pt="3" w="100%">
                <td
                  colSpan={table?.getHeaderGroups()[0]?.headers?.length}
                  paddingtop="24px"
                  fontSize="13px"
                >
                  {loading ? <LoadSpinner /> : "No Data Found"}
                </td>
              </Tr>
            )}
            {tableRowsData.map((row, index) => (
              <Tr
                fontSize="sm"
                borderBottom="2px solid #dfdfdf"
                key={String(row.id) + String(index)}
              >
                {row.getVisibleCells().map((cell, index) => {
                  const meta = cell.column.columnDef.meta;
                  return !meta?.dropDown ? (
                    <Td
                      paddingLeft="17px"
                      key={String(cell.id) + String(index)}
                      isNumeric={meta?.isNumeric}
                      padding={tdp}
                      borderLeft={tdborderX}
                      borderRight={tdborderX}
                      // textAlign={textAlign}
                      borderColor={borderColor}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ) : (
                    <Td
                      paddingLeft="17px"
                      key={cell.id}
                      className={customaligncenter}
                    >
                      <Menu>
                        <MenuButton
                          as={Button}
                          rightIcon={<FaChevronDown fontSize="10px" />}
                        >
                          <FaPrint fontSize="14px" padding="18px 6px" />
                        </MenuButton>
                        <MenuList >
                          <MenuItem onClick={() => { handlePrintConfirmation(cell?.row.original) }}>Print Confirmation</MenuItem>
                          <MenuItem onClick={() => { handlePrintConfirmation(cell?.row.original) }}>Print Guest Folio</MenuItem>
                          <MenuItem onClick={() => { handlePrintConfirmation(cell?.row.original) }}>Print Registration</MenuItem>
                        </MenuList>
                      </Menu>
                    </Td>
                  );
                })}
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            {table.getFooterGroups().map((footerGroup, index) => (
              <tr key={String(footerGroup.id) + String(index)}>
                {footerGroup.headers.map((header, index) => (
                  <th key={String(header.id) + String(index)}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </Tfoot>
        </Table>
      )}
    </div>
  );
}
const dataTableSearchContainer = {
  position: "absolute",
  right: "3%",
  bottom: "59%",
  width: "31%",
};
const searchInputDataTable = {
  borderBottom: " 1px solid #e2e2e2",
  borderRight: "none",
  borderLeft: "none",
  borderTop: "none",
  borderRadius: "0px",
  position: "absolute",
  bottom: "38px"
};

const search = {
  position: "absolute",
  right: "0",
  top: "-76px"
}


const customaligncenter = {
  textAlign: "center"
}