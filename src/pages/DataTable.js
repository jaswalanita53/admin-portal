// DataTable.js
import React ,{useState} from "react";
import { useTable,useDrag, useDrop, useSortBy, useFilters, useGlobalFilter } from "react-table";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { ItemTypes } from './DraggableRow';
import { ChakraProvider, Table, Thead, Tbody, Tr, Th, Td, Input ,Button , chakra, Icon, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,FormControl,FormLabel} from "@chakra-ui/react";
import Axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

const StripedTr = chakra("tr", {
    baseStyle: {
      _even: { bg: "#f9f9f9" }, // Alternate row background color
      _odd: { bg: "white" }, // Default row background color
    },
  });
const DataTable = ({ columns, data , onDelete, getRooms}) => {
  const { getTableProps,getTableBodyProps,headerGroups, rows, prepareRow, setGlobalFilter,state,} = useTable( {columns, data,}, useFilters, useGlobalFilter,useSortBy);
  const { globalFilter } = state;
  const [items, setItems] = useState(data);

  const type = "ROW";

  const moveRow = (fromIndex, toIndex) => {
    const updatedData = [...data];
    const [movedRow] = updatedData.splice(fromIndex, 1);
    updatedData.splice(toIndex, 0, movedRow);
    setItems(updatedData);
  };


  const [isModalOpen, setModalOpen] = useState(false);
  const [modalValue, setModalValue] = useState('');
  const [rowId, setRowId] = useState('');
  const [isbuttonloading, setisbuttonloading]=useState(false)
  const openModal = (total,id) => {
    setModalValue(total)
    setRowId(id)
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

// UPDATE GLOBAL PRICE
const handleUpdate = async () =>{
  try{
    setisbuttonloading(true)
    const userToken = localStorage.getItem("userToken");
    const config = {
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/Admin/updateData/${rowId}`,
      headers: {
        Authorization: "Bearer " + userToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      data: {
        value: modalValue,
        rowId:rowId
      },
    };
 
    const response = await Axios(config);
    await getRooms()
    setisbuttonloading(false)
    closeModal();
  }
  catch(error){
    console.log('error message',error)
  }
}

  return (
    <ChakraProvider>
      <div>
      <DndProvider backend={HTML5Backend}>

      <Modal isOpen={isModalOpen} onClose={closeModal}> 
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Price</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Your form content */}
          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input type="text" placeholder="Enter Global Price" value={modalValue} onChange={(e) => setModalValue(e.target.value)} required/>
          </FormControl>
          {/* Add more form fields as needed */}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3}  onClick={closeModal} >
            Close
          </Button>
          <Button colorScheme="green" isLoading={isbuttonloading}   loadingText='Updating' dataId={rowId} onClick={handleUpdate}  disabled={isbuttonloading}>
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
        {/* <Input
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          mb={4}
        /> */}
        <Table {...getTableProps()} size="md" border="1px solid"
          borderColor="gray.300">
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}
              borderBottom="1px solid"
              textAlign="center"
              borderColor="gray.300"
              backgroundColor="#f2f2f2"
              >
                {headerGroup.headers.map((column) => (
                  <Th {...column.getHeaderProps(column.getSortByToggleProps())}
                  borderRight="1px solid"
                  textAlign="left"
                  borderColor="gray.300"    backgroundColor="#f2f2f2"
                  p={2}
                  >
                    {column.render("Header")}
                    {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                  </Th>
                ))}  
                <Th borderRight="1px solid"    backgroundColor="#f2f2f2"
                  textAlign="left" borderColor="gray.300">Price</Th>
              </Tr>    
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {  
              const total = row.original.price;
              const row_id = row.original.id;
              prepareRow(row);
              // return <DraggableRow key={index} index={index} data={row.cells.map(cell => cell.render('Cell'))} {...row.getRowProps()} />;
              return (
                <StripedTr {...row.getRowProps()}
                borderBottom="1px solid"
                borderColor="gray.300"
                >
                   {row.cells.map((cell) => (
                    <Td {...cell.getCellProps()}
                    textAlign="left"
                    borderRight="1px solid"
                    borderColor="gray.300" 
                    >{cell.render("Cell")}</Td>  
                    ))}
                    <Td p={2}  textAlign="center" borderRight="1px solid" borderColor="gray.300" > {total}
                      <Button   backgroundColor="#E5E5E5" colorScheme="gray" size="sm" onClick={()=>openModal(total,row_id)} value="total" ml="4" data-id="row_id">
                      <Icon as={FaEdit} boxSize={4} colorScheme="black"/>
                      </Button>
                    </Td>
                    <Td p={2} textAlign="left">
                      <Button   backgroundColor="#E5E5E5"  colorScheme="gray" size="sm" onClick={() => onDelete(row.original.id)}  isDisabled={true}  >
                      <TiDelete />
                      </Button>
                    </Td> 
                </StripedTr>
              );
            })}
          </Tbody>
        </Table>
      
      </DndProvider>
      </div>
    </ChakraProvider>
  );
};

export default DataTable;
