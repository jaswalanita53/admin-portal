// DataTable.js
import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { ChakraProvider, Input, Button, Icon, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel } from "@chakra-ui/react";
import Axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
const TableRow = ({ index, rowData, moveRow, getRooms }) => {
  const [, ref] = useDrag({
    type: ItemTypes.ROW,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.ROW,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveRow(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const isEvenRow = index % 2 === 0;
  const total = rowData.price;
  const row_id = rowData.id;
  const roomType = rowData.roomType;
  const totalPrice = rowData.totalPrice;

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalValue, setModalValue] = useState('');
  const [rowId, setRowId] = useState('');
  const [isbuttonloading, setisbuttonloading] = useState(false)

  const openModal = (total, id) => {
    setModalValue(total)
    setRowId(id)
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // UPDATE GLOBAL PRICE
  const handleUpdate = async () => {
    try {
      setisbuttonloading(true)
      const userToken = localStorage.getItem("userToken");
      const config = {
        method: "post",
        // url: `${process.env.REACT_APP_API_URL}/Admin/updateData/${rowId}`,
        url: `${process.env.REACT_APP_API_URL}/Admin/updateData/${rowId}`,
        headers: {
          Authorization: "Bearer " + userToken,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        data: {
          value: modalValue,
          rowId: rowId,
          roomType: roomType

        },
      };

      const response = await Axios(config);
      await getRooms()
      setisbuttonloading(false)
      closeModal();
    }
    catch (error) {
      console.log('error message', error)
    }
  }


  return (
    <>
      <ChakraProvider>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Price</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Your form content */}
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input type="text" placeholder="Enter Global Price" value={modalValue} onChange={(e) => setModalValue(e.target.value)} required />
              </FormControl>
              {/* Add more form fields as needed */}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={closeModal} >
                Close
              </Button>
              <Button colorScheme="green" onClick={handleUpdate} isLoading={isbuttonloading} loadingText='Updating' dataId={rowId} >
                Update
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ChakraProvider>

      <tr ref={(node) => ref(drop(node))} style={{
        background: isEvenRow ? 'white' : '#f5f5f5', // Set background color for even and odd rows
      }}>
        <td style={{ padding: '8px', border: '1px solid #ddd', color: '#0969da' }}>{rowData.accomodation}</td>
        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{rowData.abbreviation}</td>
        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{rowData.unit}</td>
        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{rowData.beds}</td>
        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{rowData.total}</td>
        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{rowData.totalPrice}
          <Button backgroundColor="#E5E5E5" colorScheme="gray" size="sm" onClick={() => openModal(totalPrice, row_id)} value="total" ml="4" data-id="row_id">
            <Icon as={FaEdit} boxSize={4} colorScheme="black" />
          </Button>
        </td>
        <td style={{ padding: '8px 15px', border: '1px solid #ddd' }}>
          <Button backgroundColor="#E5E5E5" colorScheme="gray" size="sm" isDisabled={true}> <TiDelete />
          </Button>
        </td>

      </tr>
    </>
  );
};

const SimpleTable = ({ headers, roomsData, getRooms }) => {

  const [data, setData] = useState(roomsData);


  React.useEffect(() => {
    setData(roomsData)
  }, [roomsData])

  const moveRow = (fromIndex, toIndex) => {
    const updatedData = [...data];
    const [movedRow] = updatedData.splice(fromIndex, 1);
    updatedData.splice(toIndex, 0, movedRow);
    setData(updatedData);
  };

  const handleEdit = (index) => {
    // Add your edit logic here
    console.log(`Edit row at index ${index}`);
  };

  const handleDelete = (index) => {
    // Add your delete logic here
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };
  return (
    <ChakraProvider>
      <div>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ 'background-color': '#f2f2f2', 'text-align': 'left' }}>
              {headers.map((header, index) => (
                <th style={{ padding: '8px', border: '1px solid #ddd', 'color': '#4a5568', 'font-size': 'small' }} key={index}>{header}</th>

              ))}

              {/* <th style={{ padding: '8px', border: '1px solid #ddd' }}>Name</th>
          <th style={{ padding: '8px', border: '1px solid #ddd' }}>Age</th>
          <th style={{ padding: '8px', border: '1px solid #ddd' }}>Email</th>
          <th style={{ padding: '8px', border: '1px solid #ddd' }}>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {data.map((rowData, index) => (

              <TableRow
                key={index}
                index={index}
                isHeader={false}
                rowData={rowData}
                moveRow={moveRow}
                getRooms={getRooms}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </ChakraProvider>


  );
};

export default SimpleTable;
