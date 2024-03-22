import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import TaskStatusDot from "../task-status-dot";
import KanbanTask from "../kanban-task/index";
import { TASK_STATUS } from "../../utils/task";
import "./styles.scss";

const boards = [
  {
    id: TASK_STATUS.TODO,
    title: "Not started",
  },
  {
    id: TASK_STATUS.IN_PROGRESS,
    title: "In progress",
  },
  {
    id: TASK_STATUS.DONE,
    title: "Done",
  },
];

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
    const task = tasks.find((t) => t.id === draggableId);
    const newTask = {
      ...task,
      status: TASK_STATUS[destination.droppableId],
      relativeOrder: destination.index,
    };
    onTaskUpdate(newTask);
  };

  return (
    <div className="kanban">
      <DragDropContext onDragEnd={onDragEnd}>
        {boards.map((el) => (
          <div key={`board-${el.id}`} className="kanban__board">
            <div className="kanban__board__column-title">
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
                    className="kanban__board__column"
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
                            isDragDisabled={task.status === TASK_STATUS.DONE}
                          >
                            {(innerProvided, innerSnapshot) => {
                              return (
                                <KanbanTask
                                  task={task}
                                  provided={innerProvided}
                                  snapshot={innerSnapshot}
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
