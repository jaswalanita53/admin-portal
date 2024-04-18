import { useDrag } from 'react-dnd';

const DraggableItem = ({ id, name }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'IMAGE', id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {name}
    </div>
  );
};

export default DraggableItem;