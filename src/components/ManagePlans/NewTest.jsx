import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableItem from './DraggableItem';
import DroppableArea from './DroppableArea';

 const NewTest= () => {
  const handleDrop = (item) => {
    console.log('Dropped item:', item);
  };

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <DraggableItem id="1" name="Item 1" />
        <DraggableItem id="2" name="Item 2" />
        <DroppableArea onDrop={handleDrop} />
      </DndProvider>
    </div>
  );
};
export default NewTest