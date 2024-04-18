import { useDrop } from 'react-dnd';

const DroppableArea = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'IMAGE',
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{ backgroundColor: isOver ? 'lightblue' : 'white' }}
    >
      Drop here
    </div>
  );
};

export default DroppableArea;