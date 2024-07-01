import React, { useState } from "react";
import axios from "axios";
import styles from "./TaskBox.module.css";
import TaskCard from "../TaskCard/TaskCard";
import CollapseAllIcon from "../../../Assets/collapseall.png";
import AddIcon from "../../../Assets/plus.png";

const TaskBox = ({ section, tasks = [] }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapseAll = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleAddTask = () => {
    // Logic to add a new task
  };

  return (
    <div className={styles.taskBox}>
      <div className={styles.taskBoxHeader}>
        <span>{section.charAt(0).toUpperCase() + section.slice(1)}</span>
        <div>
          {section === "to do" && (
            <button className={styles.addButton} onClick={handleAddTask}>
              <img src={AddIcon} alt="add" />
            </button>
          )}
          <img
            className={styles.collapseAllButton}
            onClick={handleCollapseAll}
            src={CollapseAllIcon}
            alt="collapse all"
          />
        </div>
      </div>
      <div className={styles.taskCards}>
        {tasks.length !== 0 &&
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              section={section}
              isCollapsed={isCollapsed}
            />
          ))}
      </div>
    </div>
  );
};

export default TaskBox;
