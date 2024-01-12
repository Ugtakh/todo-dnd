"use client";

import { status } from "@/utils";
import React, { FC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

type PropsType = {
  board: {
    id: string;
    title: string;
    hasBtn: boolean;
    tasks: {
      id: string;
      name: string;
      priority: string;
      author: string;
      isStatus: string;
    }[];
  };
  handleOpen: () => void;
};

const Board: FC<PropsType> = ({ board, handleOpen }) => {
  return (
    <Droppable droppableId={"droppable-" + board.id}>
      {(provided) => (
        <div
          className="h-full flex-1 items-stretch bg-slate-300 rounded-lg p-4"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className="flex justify-between">
            <h1 className="text-black text-2xl font-bold text-left h-12">
              {board.title}
            </h1>
            {board.hasBtn && (
              <button
                className="btn btn-circle btn-success text-white"
                onClick={handleOpen}
              >
                +
              </button>
            )}
          </div>

          {board?.tasks.map((task, i) => (
            <Draggable key={i} draggableId={task.id.toString()} index={i}>
              {(provided, snapshot) => (
                <div
                  className={`card bg-base-100 w-full  shadow-xl my-5 p-5`}
                  {...provided.dragHandleProps}
                  {...provided.draggableProps}
                  ref={provided.innerRef}
                  // style={{
                  //   backgroundColor: snapshot.isDragging
                  //     ? "#F081AA"
                  //     : "bg-base-100",
                  // }}
                >
                  <div className="card-body">
                    <div className="flex justify-between items-center">
                      <h2 className="card-title text-white">{task.name}</h2>
                      <span
                        className={`badge badge-${
                          status[task.priority]
                        } badge-outline ml-5`}
                      >
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex flex-col items-start mt-2">
                      <p className="">
                        Author: <span className="ml-5 ">Name</span>
                      </p>
                      <p className="">
                        Date: <span>2024-01-11</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Board;
