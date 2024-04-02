import dayjs from "dayjs";
import isTodayPlugin from "dayjs/plugin/isToday";
import objectPlugin from "dayjs/plugin/toObject";
import weekdayPlugin from "dayjs/plugin/weekday";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { ChevronBack, ChevronForward } from "../../assets/icons";
import { IconButton } from "../button";
import { TASK_STATUS } from "../../utils/task";
import TaskStatusDot from "../task-status-dot";
import "./styles.scss";
// Extend Day.js globally
dayjs.extend(weekdayPlugin);
dayjs.extend(objectPlugin);
dayjs.extend(isTodayPlugin);

function Header({ currentMonth, onPrevMonth, onNextMonth }) {
  const dateFormat = "MMMM YYYY";
  return (
    <div className="calendar__header">
      <IconButton icon={<ChevronBack />} onClick={onPrevMonth} />
      <div className="calendar__header__month">
        <h4>{currentMonth.format(dateFormat)}</h4>
      </div>
      <IconButton icon={<ChevronForward />} onClick={onNextMonth} />
    </div>
  );
}

Header.propTypes = {
  currentMonth: PropTypes.object.isRequired,
  onPrevMonth: PropTypes.func.isRequired,
  onNextMonth: PropTypes.func.isRequired,
};

function DaysHeader() {
  const days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) =>
      dayjs()
        .weekday((i + 1) % 7)
        .format("dddd"),
    );
  }, []);
  return (
    <div className="calendar__days-header">
      {days.map((day, i) => (
        <div
          className="calendar__days-header__day"
          key={`calendar-header-day-${i}`}
        >
          {day}
        </div>
      ))}
    </div>
  );
}

function CalendarTask({ task, compressed }) {
  const Tag = compressed ? "div" : Link;
  return (
    <Tag
      to={`/tasks/${task.id}`}
      className={`calendar-task ${compressed ? "calendar-task--compressed" : ""}`}
    >
      <TaskStatusDot status={task.status} />
      <p className="calendar-task__title">
        {task.title} {!compressed && `(${dayjs(task.dueDate).format("HH:mm")})`}
      </p>
    </Tag>
  );
}

CalendarTask.propTypes = {
  task: PropTypes.object.isRequired,
  compressed: PropTypes.bool.isRequired,
};

function CalendarDueTodayTasksModal({ isOpen, tasks, onOpenChange }) {
  const date = tasks[0]?.dueDate;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="auto">
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              Tasks due on {dayjs(date).format("DD MMM YYYY")}
            </ModalHeader>
            <ModalBody>
              {tasks?.map((task) => (
                <CalendarTask task={task} key={task.id} compressed={false} />
              ))}
              {tasks.length === 0 && <p>No tasks due on this day</p>}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

CalendarDueTodayTasksModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  tasks: PropTypes.array.isRequired,
  onOpenChange: PropTypes.func.isRequired,
};

function Cells({ arrayOfDays }) {
  const [dueTodayTasks, setDueTodayTasks] = useState([]);
  const [dueTodayTasksModalOpen, setDueTodayTasksModalOpen] = useState(false);

  const openDueTodayTasksModal = (tasks) => {
    setDueTodayTasks(tasks);
    setDueTodayTasksModalOpen(true);
  };

  return (
    <>
      <div className="calendar__cells">
        {arrayOfDays.map((week, index) => (
          <div className="calendar__cells__week" key={index}>
            {week.dates.map((d, i) => (
              <div
                tabIndex={0}
                role="button"
                onClick={() => openDueTodayTasksModal(d.tasksDue)}
                onKeyDown={(event) => {
                  if (event.keyCode === 13 || event.keyCode === 32) {
                    openDueTodayTasksModal(d.tasksDue);
                  }
                }}
                className={`calendar__cells__cell ${!d.isCurrentMonth ? "calendar__cells__cell--disabled" : ""} ${d.isCurrentDay ? "calendar__cells__cell--current-day" : ""}`}
                key={i}
              >
                <p className="number">{d.day}</p>
                <div className="calendar__cells__cell__tasks">
                  {/* First task */}
                  {d.tasksDue[0] ? (
                    <CalendarTask
                      task={d.tasksDue[0]}
                      key={d.tasksDue[0].id}
                      compressed
                    />
                  ) : (
                    ""
                  )}
                  {/* Other tasks shown as dots */}
                  <div className="calendar__cells__cell__tasks__dots">
                    {d.tasksDue.length > 1
                      ? d.tasksDue
                          .filter((t, taskIndex) => taskIndex > 0)
                          .map((task) => (
                            <TaskStatusDot status={task.status} key={task.id} />
                          ))
                      : ""}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <CalendarDueTodayTasksModal
        isOpen={dueTodayTasksModalOpen}
        tasks={dueTodayTasks}
        onOpenChange={() => setDueTodayTasksModalOpen(false)}
      />
    </>
  );
}

Cells.propTypes = {
  arrayOfDays: PropTypes.array.isRequired,
};

function Calendar({ tasks }) {
  const now = dayjs();
  const [currentMonth, setCurrentMonth] = useState(now);
  const [arrayOfDays, setArrayOfDays] = useState([]);

  const nextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));
  const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, "month"));

  const getAllDays = useMemo(() => {
    let currentDate = currentMonth.startOf("month").weekday(1);
    const nextMonthStart = currentMonth.add(1, "month").startOf("month");
    const allDates = [];
    let weekDates = [];
    let weekCounter = 1;

    while (currentDate.isBefore(nextMonthStart, "day")) {
      const formatted = {
        day: currentDate.date(),
        month: currentDate.month(),
        year: currentDate.year(),
        isCurrentMonth: currentDate.month() === currentMonth.month(),
        isCurrentDay: currentDate.isToday(),
        tasksDue: tasks.filter(
          // eslint-disable-next-line no-loop-func
          (task) =>
            dayjs(task.dueDate).isSame(currentDate, "day") &&
            task.status !== TASK_STATUS.DONE,
        ),
      };

      weekDates.push(formatted);

      if (
        weekCounter % 7 === 0 ||
        currentDate.add(1, "day").isSame(nextMonthStart, "day")
      ) {
        allDates.push({ dates: weekDates });
        weekDates = [];
      }

      weekCounter += 1;
      currentDate = currentDate.add(1, "day");
    }

    return allDates;
  }, [currentMonth, tasks]);

  useEffect(() => {
    setArrayOfDays(getAllDays);
  }, [getAllDays]);

  return (
    <div className="calendar">
      <Header
        currentMonth={currentMonth}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
      />
      <DaysHeader />
      <Cells arrayOfDays={arrayOfDays} />
    </div>
  );
}

Calendar.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default Calendar;

// code inspiration from: https://gist.github.com/Kapaak/bb83730d04bc9d6cbf50d400ec9cde61#file-calendar-jsx
