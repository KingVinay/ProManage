import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import styles from "./Dashboard.module.css";
import TaskBox from "./TaskBox/TaskBox";
import AddEmail from "./AddEmail/AddEmail";
import people from "../../Assets/people.png";
import format from "../../Utils/FormatDate";

const Dashboard = () => {
  const userName = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState("week");
  const [tasks, setTasks] = useState([]);

  // useEffect(() => {
  //   const fetchAllTasks = async () => {
  //     try {
  //       const response = await axios({
  //         method: "get",
  //         url: `${process.env.REACT_APP_BACKEND_HOST}/api/task/all`,
  //         headers: { Authorization: `${token}` },
  //       });

  //       setTasks(response.data);
  //       console.log(tasks);
  //     } catch (error) {
  //       console.error("Error fetching all tasks:", error);
  //     }
  //   };
  //   fetchAllTasks();
  // }, []);

  const fetchFilteredTasks = async (filters) => {
    try {
      const response = await axios({
        method: "get",
        url: `${process.env.REACT_APP_BACKEND_HOST}/api/task/filteredTasks?filter=${filters}`,
        headers: { Authorization: `${token}` },
      });
      console.log(tasks);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching filtered tasks:", error);
    }
  };

  useEffect(() => {
    fetchFilteredTasks(filters);
  }, [filters]);

  return (
    <div className={styles.boardContainer}>
      <Navbar option="Dashboard" />
      <div className={styles.boardContent}>
        <div className={styles.header}>
          <div className={styles.welcome}>Welcome! {userName}</div>
          <div className={styles.date}>{format(new Date())}</div>
        </div>
        <div className={styles.boardHeader}>
          <div className={styles.boardHeading}>
            <span>Board</span>
            <button
              className={styles.addPeopleButton}
              onClick={() => setIsModalOpen(true)}
            >
              <img src={people} alt="people icon" />
              Add People
            </button>
            {isModalOpen && <AddEmail onClose={() => setIsModalOpen(false)} />}
          </div>
          <div className={styles.filter}>
            <select
              value={filters}
              onChange={(e) => setFilters(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
        <div className={styles.taskBoxes}>
          <TaskBox section="backlog" tasks={tasks["backlogTasks"]} />
          <TaskBox section="todo" tasks={tasks["todoTasks"]} />
          <TaskBox section="inProgress" tasks={tasks["inProgressTasks"]} />
          <TaskBox section="completed" tasks={tasks["completedTasks"]} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
