"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Task from "./Components/Task";
import { v4 as uuidv4 } from 'uuid';
import CompletedTask from "./Components/CompletedTask";

const page = () => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [Title, setTitle] = useState("");
  const [Desc, setDesc] = useState("");
  const [Tasklist, setTasklist] = useState([]);
  const [CompletedTasklist, setCompletedTasklist] = useState([]);
  const latestTaskRef = useRef(null);

  useEffect(() => {
    if (latestTaskRef.current) {
      setTimeout(() => {
        latestTaskRef.current.scrollIntoView({ behavior: "smooth", block: 'start' });
      }, 100);
    }
  }, [Tasklist]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(e);
    if (Title.length > 0 && Desc.length > 0) {
      setTasklist([...Tasklist, { id: generateRandomId(), Title, Desc }]);
      setTitle("");
      setDesc("");
      setisModalOpen(false);
      console.log(Tasklist);
    }
  };
  const generateRandomId = () => {
    return uuidv4();
  };
  return (
    <>
      <div className="modal-container">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: isModalOpen ? 45 : 0 }}
          onClick={() => {
            console.log(isModalOpen);
            setisModalOpen(!isModalOpen);
          }}
          className="modal-open-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#fff"
          >
            <path
              fillRule="evenodd"
              d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
            ></path>
          </svg>
        </motion.div>
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="modal-form"
              initial={{ scale: 0, transformOrigin: "bottom right" }}
              animate={{ scale: 1, transformOrigin: "bottom right" }}
              exit={{ scale: 0, transformOrigin: "bottom right" }}
            >
              <h4>Create a task</h4>
              <form onSubmit={formSubmitHandler}>
                <input
                  type="text"
                  placeholder="Enter title"
                  value={Title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Enter description"
                  value={Desc}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                />
                <button>Create</button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="main-container">
        <div className="task-wrap">
        {Tasklist.length > 0 && 
          <motion.p
          className="Heading"
          initial={{ opacity: 0, y: -50, transition: { delay: 0.3 } }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.3 }}}>
              To Do
          </motion.p> }
          <AnimatePresence>
            {Tasklist.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ height: 0, scaleX: 0, opacity: 0, transformOrigin: "right", transition: { delay: 0.3 } }}
              >
                <Task setCompletedTasklist={setCompletedTasklist} CompletedTasklist={CompletedTasklist} setTasklist={setTasklist} Tasklist={Tasklist} index={index} uniqueIdentifier={task.id} key={task.id} Title={task.Title} Desc={task.Desc} />
              </motion.div>
            ))}
          </AnimatePresence>
          {Tasklist.length > 0 &&
            <motion.button
              className="clear-task" onClick={() => { setTasklist([]); }}
              initial={{ opacity: 0, y: -50, transition: { delay: 0.3 } }}
              animate={{ opacity: 1, y: 0 }}
              ref={latestTaskRef}
            >
              Clear All
            </motion.button>
          }
        </div>
        <div className="completed-task-wrap">
          {CompletedTasklist.length === 0 && 
          <motion.p
          className="intialZeroState"
          initial={{ opacity: 0, y: -200, transition: { delay: 0.3 } }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.3 }}}>
              No task completed found
          </motion.p> }
          {CompletedTasklist.length > 0 && 
          <motion.p
          className="Heading"
          initial={{ opacity: 0, y: -50, transition: { delay: 0.3 } }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.3 }}}>
              Completed Task
          </motion.p> }
          <AnimatePresence>
            {CompletedTasklist.map((task, index) => (
              <CompletedTask setCompletedTasklist={setCompletedTasklist} CompletedTasklist={CompletedTasklist} setTasklist={setTasklist} Tasklist={Tasklist} index={index} uniqueIdentifier={task.id} key={task.id} Title={task.Title} Desc={task.Desc} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* <button onClick={() => { setTasklist([...Tasklist, { id: generateRandomId(), Title: 'Title', Desc: 'Desc' }]); }}>Add Dummy Task</button> */}
    </>
  );
};

export default page;
