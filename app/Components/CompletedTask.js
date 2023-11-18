import { motion } from "framer-motion";
import { React } from "react";

const CompletedTask = (props) => {
    const undoHandler = (e, index) => {
        e.stopPropagation();
        props.setTasklist([...props.Tasklist, props.CompletedTasklist[index]])
        const updatedCompletedTaskList = props.CompletedTasklist.filter((_, i) => i !== index);
        props.setCompletedTasklist(updatedCompletedTaskList);
    }
    return (
        <motion.div
            initial={{ height: 0, scaleX: 0, opacity: 0, transformOrigin: "left", transition: { delay: 0.2 } }}
            animate={{ height: "auto", scaleX: 1, opacity: 1, transformOrigin: "left" }}
            exit={{
                scaleX: 0,
                opacity: 0,
                backgroundColor: '#00f',
                transformOrigin: "left",
                borderRadius: '10',
                color: '#fff',
                transition: {
                    duration: 0.2,
                    scaleX: { delay: 0.3, duration: 0.2 },
                    opacity: { delay: 0.4, duration: 0.2 },
                    backgroundColor: { duration: 0.3 },
                    color: { duration: 0.3 }
                }
            }}
            className="task completed"
            id={props.uniqueIdentifier}
        >
            <h4>
                {props.Title}
                <div onClick={(e) => { undoHandler(e, props.index) }} className="remove-task">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" id="undo"><g data-name="Layer 2"><path d="M20.22 21a1 1 0 0 1-1-.76 8.91 8.91 0 0 0-7.8-6.69v1.12a1.78 1.78 0 0 1-1.09 1.64A2 2 0 0 1 8.18 16l-5.06-4.41a1.76 1.76 0 0 1 0-2.68l5.06-4.42a2 2 0 0 1 2.18-.3 1.78 1.78 0 0 1 1.09 1.64V7A10.89 10.89 0 0 1 21.5 17.75a10.29 10.29 0 0 1-.31 2.49 1 1 0 0 1-1 .76zm-9.77-9.5a11.07 11.07 0 0 1 8.81 4.26A9 9 0 0 0 10.45 9a1 1 0 0 1-1-1V6.08l-4.82 4.17 4.82 4.21v-2a1 1 0 0 1 1-.96z" data-name="undo"></path></g></svg>
                </div>
            </h4>
        </motion.div>
    );
};

export default CompletedTask;
