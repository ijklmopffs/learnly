// import { useState } from "react";
// import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
// import questionsData from "../../questions.json";

// export default function DraggableQuiz({ onComplete }) {
//   const [droppedItems, setDroppedItems] = useState({});
//   const [feedback, setFeedback] = useState({});
//   const [draggedItems, setDraggedItems] = useState({});

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     if (!over) return;

//     const draggedItem = active.id;
//     const dropTarget = over.id;

//     setDroppedItems((prev) => ({ ...prev, [dropTarget]: draggedItem }));
//     setDraggedItems((prev) => ({ ...prev, [draggedItem]: true }));

//     const currentQuestion = questionsData.find(
//       (q) => q.type === "drag-and-drop"
//     );
//     const correctAnswers = currentQuestion?.matching || {};
//     const isCorrect = correctAnswers[dropTarget] === draggedItem;

//     setFeedback((prev) => ({
//       ...prev,
//       [dropTarget]: isCorrect ? "correct" : "incorrect",
//     }));
//   };

//   const handleSubmit = () => {
//     const currentQuestion = questionsData.find(
//       (q) => q.type === "drag-and-drop"
//     );
//     const correctAnswers = currentQuestion?.matching || {};
//     let newScore = 0;

//     Object.keys(correctAnswers).forEach((key) => {
//       if (droppedItems[key] === correctAnswers[key]) {
//         newScore += 6;
//       }
//     });

//     onComplete(newScore);
//   };

//   const currentQuestion = questionsData.find((q) => q.type === "drag-and-drop");
//   const options = currentQuestion?.matching
//     ? Object.values(currentQuestion.matching)
//     : [];
//   const answers = currentQuestion?.matching
//     ? Object.keys(currentQuestion.matching)
//     : [];

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen text-white bg-[#f4f7fd]">
//       <div className="bg-white w-4/5 md:w-[60rem] p-6 rounded-lg text-center text-black">
//         <div className="bg-purple-800 text-white flex justify-between items-center p-4 rounded-lg">
//           <h1 className="text-xl font-bold">Goal: 30 points</h1>
//         </div>

//         <div className="mt-5 space-y-10">
//           <h2 className="text-xl font-semibold">Question</h2>
//           <h2 className="font-semibold">{currentQuestion?.question}</h2>

//           <DndContext onDragEnd={handleDragEnd}>
//             <div className="mt-4 flex flex-wrap md:flex-nowrap gap-6 justify-center">
//               {options.map((option, index) => (
//                 <DraggableItem
//                   key={index}
//                   id={option}
//                   label={option}
//                   isDropped={draggedItems[option]}
//                 />
//               ))}
//             </div>

//             <div className="mt-6 flex flex-wrap md:flex-nowrap gap-6 justify-center">
//               {answers.map((answer, index) => (
//                 <DroppableArea
//                   key={index}
//                   id={answer}
//                   label={answer}
//                   feedback={feedback[answer]}
//                   droppedItem={droppedItems[answer]}
//                 />
//               ))}
//             </div>
//           </DndContext>

//           <button
//             className="mt-4 px-6 py-2 bg-[#6E6F6B] text-white rounded-lg shadow-md hover:opacity-50 cursor-pointer"
//             onClick={handleSubmit}
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function DraggableItem({ id, label, isDropped }) {
//   const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

//   const style = {
//     transform: transform
//       ? `translate(${transform.x}px, ${transform.y}px)`
//       : "none",
//     transition: "transform 0.2s ease-in-out",
//     zIndex: 1000,
//     opacity: isDropped ? 0.5 : 1,
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...listeners}
//       {...attributes}
//       className={`px-3 py-6 bg-[#6E6F6B] text-white rounded-lg shadow-md cursor-pointer text-center w-32 md:w-56 font-semibold ${
//         isDropped ? "opacity-50 border border-dashed border-gray-400" : ""
//       }`}
//     >
//       {label}
//     </div>
//   );
// }

// function DroppableArea({ id, label, feedback, droppedItem }) {
//   const { setNodeRef, isOver } = useDroppable({ id });

//   const borderColor =
//     feedback === "correct"
//       ? "border-green-500"
//       : feedback === "incorrect"
//       ? "border-[#ea5555]"
//       : "border-gray-300";
//   const backgroundColor =
//     feedback === "correct"
//       ? "bg-green-100"
//       : feedback === "incorrect"
//       ? "bg-red-100"
//       : "bg-white";

//   return (
//     <div
//       ref={setNodeRef}
//       className={`relative w-32 md:w-56 px-3 py-6 border-2 rounded-lg text-center font-semibold flex items-center justify-center transition-all ${borderColor} ${backgroundColor}`}
//     >
//       {!droppedItem ? (
//         <span className="text-gray-700">{label}</span>
//       ) : (
//         <span className="text-black">{droppedItem}</span>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import questionsData from "../../questions.json";

export default function DraggableQuiz({ onComplete }) {
  const [droppedItems, setDroppedItems] = useState({});
  const [feedback, setFeedback] = useState({});
  const [draggedItems, setDraggedItems] = useState({});

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor) // Enables mobile drag-and-drop support
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const draggedItem = active.id;
    const dropTarget = over.id;

    setDroppedItems((prev) => ({ ...prev, [dropTarget]: draggedItem }));
    setDraggedItems((prev) => ({ ...prev, [draggedItem]: true })); // Keeps a faded remnant

    const currentQuestion = questionsData.find(
      (q) => q.type === "drag-and-drop"
    );
    const correctAnswers = currentQuestion?.matching || {};
    const isCorrect = correctAnswers[dropTarget] === draggedItem;

    setFeedback((prev) => ({
      ...prev,
      [dropTarget]: isCorrect ? "correct" : "incorrect",
    }));
  };

  const handleSubmit = () => {
    const currentQuestion = questionsData.find(
      (q) => q.type === "drag-and-drop"
    );
    const correctAnswers = currentQuestion?.matching || {};
    let newScore = 0;

    Object.keys(correctAnswers).forEach((key) => {
      if (droppedItems[key] === correctAnswers[key]) {
        newScore += 6;
      }
    });

    onComplete(newScore);
  };

  const currentQuestion = questionsData.find((q) => q.type === "drag-and-drop");
  const options = currentQuestion?.matching
    ? Object.values(currentQuestion.matching)
    : [];
  const answers = currentQuestion?.matching
    ? Object.keys(currentQuestion.matching)
    : [];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-[#f4f7fd]">
      <div className="bg-white w-4/5 md:w-[60rem] p-6 rounded-lg text-center text-black">
        <div className="bg-purple-800 text-white flex justify-between items-center p-4 rounded-lg">
          <h1 className="text-xl font-bold">Goal: 30 points</h1>
        </div>

        <div className="mt-5 space-y-10">
          <h2 className="text-xl font-semibold">Question</h2>
          <h2 className="font-semibold">{currentQuestion?.question}</h2>

          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div className="mt-4 flex flex-wrap md:flex-nowrap gap-6 justify-center">
              {options.map((option, index) => (
                <DraggableItem
                  key={index}
                  id={option}
                  label={option}
                  isDropped={draggedItems[option]}
                />
              ))}
            </div>

            <div className="mt-6 flex flex-wrap md:flex-nowrap gap-6 justify-center">
              {answers.map((answer, index) => (
                <DroppableArea
                  key={index}
                  id={answer}
                  label={answer}
                  feedback={feedback[answer]}
                  droppedItem={droppedItems[answer]}
                />
              ))}
            </div>
          </DndContext>

          <button
            className="mt-4 px-6 py-2 bg-[#6E6F6B] text-white rounded-lg shadow-md hover:opacity-50 cursor-pointer"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

function DraggableItem({ id, label, isDropped }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : "none",
    transition: "transform 0.2s ease-in-out",
    zIndex: 1000,
    opacity: isDropped ? 0.3 : 1, // Keeps a faded remnant
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`px-3 py-6 bg-[#6E6F6B] text-white rounded-lg shadow-md cursor-pointer text-center w-32 md:w-56 font-semibold ${
        isDropped ? "opacity-30 border border-dashed border-gray-400" : ""
      }`}
    >
      {label}
    </div>
  );
}

function DroppableArea({ id, label, feedback, droppedItem }) {
  const { setNodeRef } = useDroppable({ id });

  const borderColor =
    feedback === "correct"
      ? "border-green-500"
      : feedback === "incorrect"
      ? "border-[#ea5555]"
      : "border-gray-300";
  const backgroundColor =
    feedback === "correct"
      ? "bg-green-100"
      : feedback === "incorrect"
      ? "bg-red-100"
      : "bg-white";

  return (
    <div
      ref={setNodeRef}
      className={`relative w-32 md:w-56 px-3 py-6 border-2 rounded-lg text-center font-semibold flex items-center justify-center transition-all ${borderColor} ${backgroundColor}`}
    >
      {!droppedItem ? (
        <span className="text-gray-700">{label}</span>
      ) : (
        <span className="text-black">{droppedItem}</span>
      )}
    </div>
  );
}
