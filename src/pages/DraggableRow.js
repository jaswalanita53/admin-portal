// DraggableRow.js
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Tr, Td } from '@chakra-ui/react';
import { ItemTypes } from './ItemTypes';

const DraggableRow = ({ index, moveRow, ...rowProps }) => {
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

  return (
    <Tr ref={(node) => ref(drop(node))} {...rowProps} />
  );
};

export default DraggableRow;
