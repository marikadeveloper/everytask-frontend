import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ListCircle } from "../../assets/icons";
import TaskDeadline from "../task-deadline";
import TaskImpactChip from "../task-impact-chip";
import TaskStatusDot from "../task-status-dot";
import "./styles.scss";

const boards = [
  {
    id: "TODO",
    title: "Not started",
  },
  {
    id: "IN_PROGRESS",
    title: "Doing",
  },
  {
    id: "DONE",
    title: "Done",
  },
];

const KanbanTask = ({ task, provided, snapshot }) => {
  return (
    <div
      className="kanban-task"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        backgroundColor: snapshot.isDragging ? "white" : "white",
        ...provided.draggableProps.style,
      }}
    >
      <p className="kanban-task__title">
        <span className="kanban-task__emoji">{task.emoji}</span>
        {task.title}
      </p>
      <div className="kanban-task__footer">
        <div>
          <TaskImpactChip impact={task.impact} iconOnly />
          <TaskDeadline deadline={task.dueDate} short />
          {task.category && (
            <p className="kanban-task__footer__category">
              {task.category?.name}
            </p>
          )}
        </div>
        {!!task.checklistItems?.length && (
          <div className="kanban-task__footer__checklist">
            <ListCircle />
            <span>
              {task.checklistItems.filter((item) => item.checked).length}/
              {task.checklistItems.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

function Kanban({ tasks, onTaskUpdate }) {
  const [countPerStatus, setCountPerStatus] = useState({});

  useEffect(() => {
    // TODO: maybe do this on backend side?
    const newCountPerStatus = {};
    tasks.forEach((task) => {
      if (newCountPerStatus[task.status]) {
        newCountPerStatus[task.status] += 1;
      } else {
        newCountPerStatus[task.status] = 1;
      }
    });
    setCountPerStatus(newCountPerStatus);
  }, [tasks]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const task = tasks.find((task) => task.id === draggableId);
    const newTask = {
      ...task,
      status: destination.droppableId,
      relativeOrder: destination.index,
    };
    onTaskUpdate(newTask);
  };

  return (
    // TODO: empty state
    <div className="tasks-kanban">
      <DragDropContext onDragEnd={onDragEnd}>
        {boards.map((el, ind) => (
          <div key={"board -" + el.id} className="tasks-kanban__board">
            <div className="tasks-kanban__board__column-title">
              <TaskStatusDot status={el.id} />
              <p>
                {el.title} ({countPerStatus[el.id] || 0})
              </p>
            </div>
            <Droppable droppableId={el.id}>
              {(provided, snapshot) => {
                return (
                  <div
                    ref={provided.innerRef}
                    className="tasks-kanban__board__column"
                    style={{
                      background: snapshot.isDraggingOver ? "white" : "white",
                    }}
                    {...provided.droppableProps}
                  >
                    {tasks
                      .filter((task) => task.status === el.id)
                      .map((task, index) => {
                        return (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <KanbanTask
                                  task={task}
                                  provided={provided}
                                  snapshot={snapshot}
                                />
                              );
                            }}
                          </Draggable>
                        );
                      })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
}

Kanban.propTypes = {
  tasks: PropTypes.array.isRequired,
  onTaskUpdate: PropTypes.func.isRequired,
};

export default Kanban;
