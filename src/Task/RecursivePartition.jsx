import { useState } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

const generateRandomColor = () => {
  const hex = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Recursive Partition Component
const RecursivePartition = ({ id, onRemove }) => {
  const [splitDirection, setSplitDirection] = useState(null); // 'V' or 'H'
  const [color, setColor] = useState(generateRandomColor());
  const [children, setChildren] = useState([]);

  const handleSplit = (direction) => {
    setSplitDirection(direction);
    const newChild1 = { id: `${id}-1`, color };
    const newChild2 = { id: `${id}-2`, color: generateRandomColor() };
    setChildren([newChild1, newChild2]);
  };

  const handleRemove = (childId) => {
    setChildren(children.filter((child) => child.id !== childId));
  };

  const renderChildren = () => {
    if (!splitDirection) {
      return (
        <div
          className="relative w-full h-full"
          style={{ backgroundColor: color }}
        >
          <div className="absolute top-[50%] left-[50%] space-x-4 space-y-4">
            <button
              onClick={() => handleSplit("V")}
              className="bg-gray-200 p-4 rounded-xl border"
            >
              V
            </button>
            <button
              onClick={() => handleSplit("H")}
              className="bg-gray-200 p-4 rounded-xl border"
            >
              H
            </button>
            {onRemove && (
              <button
                onClick={onRemove}
                className="bg-red-700 text-white p-4 rounded-xl border"
              >
                -
              </button>
            )}
          </div>
        </div>
      );
    }

    return (
      <div
        className={`flex ${
          splitDirection === "V" ? "flex-row" : "flex-col"
        } w-full h-full`}
      >
        {children.map((child, index) => (
          <ResizableBox
            key={child.id}
            width={splitDirection === "V" ? 300 : undefined}
            height={splitDirection === "H" ? 300 : undefined}
            minConstraints={[150, 150]}
            style={{ flexBasis: "50%" }}
            maxConstraints={[window.innerWidth, window.innerHeight]}
            className="relative border border-gray-400"
          >
            <RecursivePartition
              id={child.id}
              onRemove={() => handleRemove(child.id)}
              color={generateRandomColor()}
            />
          </ResizableBox>
        ))}
         
      </div>
    );
  };

  return renderChildren();
};

export default RecursivePartition;