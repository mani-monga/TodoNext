import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const Task = (props) => {
    const [accordianOpen, setaccordianOpen] = useState(false);
    const [taskComplete, settaskComplete] = useState(false);
    const completedTaskHandler = (e, index) => {
        e.stopPropagation();
        console.log(props.Tasklist[index])
        setaccordianOpen(false);
        settaskComplete(true)
        props.setCompletedTasklist([...props.CompletedTasklist, props.Tasklist[index]]);
        const updatedTaskList = props.Tasklist.filter((_, i) => i !== index);
        props.setTasklist(updatedTaskList);
    }
    const taskRemoveHandler = (e, index) => {
        e.stopPropagation();
        console.log(props.Tasklist)
        setaccordianOpen(false);
        const updatedTaskList = props.Tasklist.filter((_, i) => i !== index);
        props.setTasklist(updatedTaskList);
    }
    return (
        <motion.div
            style={{transformOrigin: 'right'}}
            initial={{ height: 0, scaleX: 0, opacity: 0, transformOrigin: "left" }}
            animate={{ height: "auto", scaleX: 1, opacity: 1, transformOrigin: "left" }}
            exit={{
                scaleX: 0,
                opacity: 0,
                backgroundColor: taskComplete ? '#0f0' : '#f00',
                transformOrigin: "right",
                color: '#fff',
                transition: {
                    duration: 0.3,
                    scaleX: { delay: 0.3, duration: 0.2 },
                    opacity: { delay: 0.4, duration: 0.2 },
                    backgroundColor: { duration: 0.3 },
                    color: { duration: 0.3 }
                }
            }}
            className="task accordian"
            id={props.uniqueIdentifier}
        >
            <h4 onClick={() => setaccordianOpen(!accordianOpen)}>
                <motion.div
                    className="accordian-trigger"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: accordianOpen ? 90 : 0 }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="7 18 13 12 7 6"></polyline>
                    </svg>
                </motion.div>
                {props.Title}
                <div className="task-actions">
                    <div onClick={(e) => { completedTaskHandler(e, props.index) }} className="complete-task">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M4 10L8 14L16 6" stroke="#00B300" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    <div onClick={(e) => { taskRemoveHandler(e, props.index) }} className="remove-task">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="red" width="20" height="20" id="cross" viewBox="0 0 92 92">
                            <path d="M70.7 64.3c1.8 1.8 1.8 4.6 0 6.4-.9.9-2 1.3-3.2 1.3-1.2 0-2.3-.4-3.2-1.3L46 52.4 27.7 70.7c-.9.9-2 1.3-3.2 1.3s-2.3-.4-3.2-1.3c-1.8-1.8-1.8-4.6 0-6.4L39.6 46 21.3 27.7c-1.8-1.8-1.8-4.6 0-6.4 1.8-1.8 4.6-1.8 6.4 0L46 39.6l18.3-18.3c1.8-1.8 4.6-1.8 6.4 0 1.8 1.8 1.8 4.6 0 6.4L52.4 46l18.3 18.3z" />
                        </svg>
                    </div>
                </div>
            </h4>
            {accordianOpen && (
                <motion.p
                    className="accordian-body"
                    initial={{ scaleX: 0, transformOrigin: "left" }}
                    animate={{ scaleX: 1, transformOrigin: "left", transition: { delay: 0.2 } }}
                    exit={{ scaleX: 0, transformOrigin: "left" }}
                >
                    {props.Desc}
                </motion.p>
            )}
        </motion.div>
    );
};

export default Task;
