import React, { useState } from "react";
import axios from "axios";
import styles from "./TaskBox.module.css";
import TaskCard from "../TaskCard/TaskCard";

const TaskBox = ({ section, tasks = [] }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleAddTask = () => {
    // Logic to add a new task
  };

  return (
    <div className={styles.taskBox}>
      <div className={styles.taskBoxHeader}>
        <span>{section.charAt(0).toUpperCase() + section.slice(1)}</span>
        {section === "todo" && (
          <button className={styles.addButton} onClick={handleAddTask}>
            +
          </button>
        )}
        <button className={styles.collapseButton} onClick={handleCollapse}>
          {isCollapsed ? "Expand" : "Collapse"}
        </button>
      </div>
      <div
        className={`${styles.taskCards} ${isCollapsed ? styles.collapsed : ""}`}
      >
        {tasks.length !== 0 &&
          tasks.map((task) => (
            <TaskCard key={task._id} task={task} section={section} />
          ))}
      </div>
    </div>
  );
};

export default TaskBox;
