"use client";

import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import Board from "../board";
import Form from "../form";

const Section = () => {
  const [boards, setBoards] = useState([
    {
      id: "0",
      title: "Todo",
      hasBtn: true,
      tasks: [
        {
          id: "1",
          name: "First task",
          priority: "high",
          author: "John",
          isStatus: "Todo",
        },
        {
          id: "3",
          name: "Third task",
          priority: "high",
          author: "John",
          isStatus: "Todo",
        },
      ],
    },
    {
      id: "1",
      title: "Doing",
      hasBtn: false,
      tasks: [
        {
          id: "2",
          name: "Second task",
          priority: "medium",
          author: "John",
          isStatus: "Doing",
        },
      ],
    },
    { id: "2", title: "Done", hasBtn: false, tasks: [] },
  ]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(() => true);
  };
  const handleClose = () => {
    setOpen(() => false);
  };

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    console.log("SRC", source);
    console.log("DES", destination);

    if (!destination) return;

    if (source.droppableId !== destination.droppableId) {
      const newData = [...JSON.parse(JSON.stringify(boards))]; //shallow
      const oldDroppableId = newData.findIndex(
        (el) => el.id === source.droppableId.split("-")[1]
      );
      const newDroppableId = newData.findIndex(
        (el) => el.id === destination.droppableId.split("-")[1]
      );
      console.log("OLD-IDX", oldDroppableId);
      console.log("NEW_IDX", newDroppableId);
      const [task] = newData[oldDroppableId].tasks.splice(source.index, 1);
      console.log("ITEM", task);
      newData[newDroppableId].tasks.splice(destination.index, 0, task);
      setBoards([...newData]);
    } else {
      const newData = [...JSON.parse(JSON.stringify(boards))];
      const droppableId = newData.findIndex(
        (el) => el.id === source.droppableId.split("-")[1]
      );
      console.log("DROP-IDX", droppableId);

      const [task] = newData[droppableId].tasks.splice(source.index, 1);
      console.log("ITEM", task);
      newData[droppableId].tasks.splice(destination.index, 0, task);
      setBoards([...newData]);
    }
  };

  return (
    <section className="w-full flex gap-10 h-full ">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {boards.map((board, i) => (
          <Board board={board} key={i} handleOpen={handleOpen} />
        ))}
      </DragDropContext>
      <Form open={open} handleClose={handleClose} />
    </section>
  );
};

export default Section;
