import React, { useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import dateFnsFormat from "date-fns/format";
import { addDays, isAfter, isBefore, isToday } from "date-fns";

const FORMAT = "dd/MM/yyyy";
function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}
const AddTask = ({ onAddTask, onCancel }) => {
  const [task, setTask] = useState();
  const [date, setDate] = useState(null);
  return (
    <div className="add-task-dialog">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <div className="add-task-actions-container">
        <div className="btns-container">
          <button
            disabled={!task}
            className="add-btn"
            onClick={() => {
              onAddTask(task, date);
              onCancel();
              setTask("");
            }}
          >
            Add Task
          </button>
          <button
            className="cancel-btn"
            onClick={() => {
              onCancel();
              setTask("");
            }}
          >
            Cancel
          </button>
        </div>
        <div className="icon-container">
          <DayPickerInput
            formatDate={formatDate}
            format={FORMAT}
            dayPickerProps={{
              modifiers: {
                disabled: [{ before: new Date() }],
              },
            }}
            onDayChange={(day) => setDate(day)}
            placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
          />
        </div>
      </div>
    </div>
  );
};

const TASKS_HEADER_MAPPING = {
  INBOX: "Inbox",
  TODAY: "Today",
  NEXT_7: "Next 7 Days",
};

const TaskItems = ({ selectedTab, tasks }) => {
  let renderTask = [...tasks];

  if (selectedTab === "NEXT_7") {
    renderTask = tasks.filter(
      (task) =>
        isAfter(task.date, new Date()) &&
        isBefore(task.date, addDays(new Date(), 7))
    );
  }

  if (selectedTab === "TODAY") {
    renderTask = tasks.filter((task) => isToday(task.date));
  }
  return (
    <div className="task-item-container">
      {renderTask.length > 0
        ? renderTask.map((task) => (
            <div className="task-item">
              <p>{task.text}</p>
              <p>{dateFnsFormat(task.date, FORMAT)}</p>
            </div>
          ))
        : "No tasks yet!"}
    </div>
  );
};

const Tasks = ({ selectedTab }) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  const addNewTask = (text, date) => {
    const newTaskItem = { text, date: date || new Date() };
    setTasks((prev) => [...prev, newTaskItem]);
  };

  return (
    <section className="tasks">
      <h1>{TASKS_HEADER_MAPPING[selectedTab]}</h1>
      {selectedTab === "INBOX" && (
        <div
          className="add-task-btn"
          onClick={() => setShowAddTask((prev) => !prev)}
        >
          <span className="plus">+</span>
          <span className="add-task-text">Add Task</span>
        </div>
      )}

      {showAddTask && (
        <AddTask
          onAddTask={addNewTask}
          onCancel={() => setShowAddTask(false)}
        />
      )}

      <TaskItems selectedTab={selectedTab} tasks={tasks} />
    </section>
  );
};

export default Tasks;
