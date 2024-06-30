import React, { useState } from "react";
import axios from "axios";
import styles from "./TaskCard.module.css";

const TaskCard = ({ task, fetchTasks, section }) => {
  const [isChecklistCollapsed, setIsChecklistCollapsed] = useState(false);

  const handleToggleChecklist = () => {
    setIsChecklistCollapsed(!isChecklistCollapsed);
  };

  const handleCheckItem = async (checklistItemId) => {
    // Logic to check/uncheck an item
  };

  const handleEditTask = () => {
    // Logic to edit a task
  };

  const handleShareTask = () => {
    // Logic to share a task
  };

  const handleDeleteTask = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/task/${task._id}`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleChangeTaskSection = async (taskId, newSection) => {
    try {
      await axios.patch(
        `http://localhost:4000/api/task/updateTaskSection/${taskId}`,
        { taskSection: newSection }
      );
      // // Wait for 2 seconds to show delay animation before refreshing tasks
      // setTimeout(fetchTasks, 2000);
    } catch (error) {
      console.error("Error changing task section:", error);
    }
  };

  return (
    <div className={styles.taskCard}>
      <div className={styles.taskCardHeader}>
        <span className={styles.bullet}>&#8226;</span>
        <span>{task.priority}</span>
        <div className={styles.taskActions}>
          <button onClick={handleEditTask}>Edit</button>
          <button onClick={handleShareTask}>Share</button>
          <button onClick={handleDeleteTask}>Delete</button>
        </div>
      </div>
      <div className={styles.taskTitle}>
        {task.title.length > 15
          ? `${task.title.substring(0, 15)}...`
          : task.title}
      </div>
      <div className={styles.taskChecklist}>
        <span>
          Checklist ({task.checklists.filter((item) => item.checked).length}/
          {task.checklists.length})
        </span>
        <button onClick={handleToggleChecklist}>
          {isChecklistCollapsed ? "Expand" : "Collapse"}
        </button>
      </div>
      {!isChecklistCollapsed && (
        <div className={styles.checklistItems}>
          {task.checklists.map((item) => (
            <div key={item._id} className={styles.checklistItem}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheckItem(item._id)}
              />
              <span>{item.description}</span>
            </div>
          ))}
        </div>
      )}
      {task.dueDate && (
        <div
          className={`${styles.dueDate} ${
            new Date(task.dueDate) < new Date() && task.section !== "done"
              ? styles.overdue
              : ""
          }`}
        >
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}
      <div className={styles.taskSectionButtons}>
        {section !== "backlog" && (
          <button onClick={() => handleChangeTaskSection(task._id, "backlog")}>
            Backlog
          </button>
        )}
        {section !== "todo" && (
          <button onClick={() => handleChangeTaskSection(task._id, "todo")}>
            Todo
          </button>
        )}
        {section !== "inProgress" && (
          <button
            onClick={() => handleChangeTaskSection(task._id, "inProgress")}
          >
            In Progress
          </button>
        )}
        {section !== "done" && (
          <button
            onClick={() => handleChangeTaskSection(task._id, "completed")}
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
