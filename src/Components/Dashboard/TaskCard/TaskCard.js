import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./TaskCard.module.css";
import burgerIcon from "../../../Assets/burger.png";
import collapseIcon from "../../../Assets/Arrow.png";
import formatDueDate from "../../../Utils/DueDateFormat";

const TaskCard = ({ task, section, isCollapsed }) => {
  const [isChecklistCollapsed, setIsChecklistCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleChecklist = () => {
    setIsChecklistCollapsed(!isChecklistCollapsed);
  };

  useEffect(() => {
    setIsChecklistCollapsed(isCollapsed);
  }, [isCollapsed]);

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "low":
        return styles.priorityLow;
      case "moderate":
        return styles.priorityModerate;
      case "high":
        return styles.priorityHigh;
      default:
        return "";
    }
  };

  const getInitials = (email) => {
    if (!email) return "";
    const [username] = email.split("@");
    const initials = username.substring(0, 2).toUpperCase();
    return initials;
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
    } catch (error) {
      console.error("Error changing task section:", error);
    }
  };

  return (
    <div className={styles.taskCard}>
      <div className={styles.header}>
        <div className={styles.priority}>
          <div
            className={`${styles.priorityBullet} ${getPriorityClass(
              task.priority
            )}`}
          />
          <span>{task.priority.toUpperCase() + " PRIORITY"}</span>
          {task.assignPerson && (
            <div className={styles.assignedPerson}>
              {getInitials(task.assignPerson)}
            </div>
          )}
        </div>
        <div
          className={styles.burgerMenu}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <img src={burgerIcon} alt="burgericon" />
          <div
            className={`${styles.menuContent} ${menuOpen ? styles.open : ""}`}
          >
            <div
              className={styles.menuItem}
              onClick={() => handleEditTask(task)}
            >
              Edit
            </div>
            <div
              className={styles.menuItem}
              onClick={() => handleShareTask(task)}
            >
              Share
            </div>
            <div
              className={styles.menuItem}
              onClick={() => handleDeleteTask(task)}
            >
              Delete
            </div>
          </div>
        </div>
      </div>
      <div className={styles.taskTitle}>{task.title}</div>
      <div className={styles.taskChecklist}>
        <span>
          {`Checklist (${
            task.checklists.filter((item) => item.checked).length
          }/${task.checklists.length})`}
        </span>
        <img
          onClick={handleToggleChecklist}
          src={collapseIcon}
          alt="collapseIcon"
        />
      </div>
      {!isChecklistCollapsed && (
        <div className={styles.checklistItems}>
          {task.checklists.map((item) => (
            <div key={item._id} className={styles.checklistItem}>
              <input
                type="checkbox"
                style={{ accentColor: "#17A2B8" }}
                checked={item.checked}
                onChange={() => handleCheckItem(item._id)}
              />
              <span>{item.description}</span>
            </div>
          ))}
        </div>
      )}
      <div className={styles.taskButtons}>
        {task.dueDate && (
          <div
            className={`${styles.dueDate} ${
              new Date(task.dueDate) < new Date() && task.section !== "done"
                ? styles.overdue
                : ""
            }`}
          >
            {formatDueDate(task.dueDate)}
          </div>
        )}
        <div className={styles.taskSectionButtons}>
          {section !== "backlog" && (
            <button
              onClick={() => handleChangeTaskSection(task._id, "backlog")}
            >
              BACKLOG
            </button>
          )}
          {section !== "to do" && (
            <button onClick={() => handleChangeTaskSection(task._id, "todo")}>
              TODO
            </button>
          )}
          {section !== "in Progress" && (
            <button
              onClick={() => handleChangeTaskSection(task._id, "inProgress")}
            >
              PROGRESS
            </button>
          )}
          {section !== "done" && (
            <button
              onClick={() => handleChangeTaskSection(task._id, "completed")}
            >
              DONE
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
