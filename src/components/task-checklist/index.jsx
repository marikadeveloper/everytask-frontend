import { Checkbox } from "@nextui-org/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Close, Ellipsis, Pencil } from "../../assets/icons/index";
import {
  useCreateChecklistItem,
  useDeleteChecklistItem,
  useUpdateChecklistItem,
} from "../../utils/checklist-item";
import { Button, IconButton } from "../button/index";
import { Input } from "../input";
import "./styles.scss";

function TaskChecklist({ taskChecklistItems, taskId, readonly = false }) {
  const [checklistItems, setChecklistItems] = useState(taskChecklistItems);
  const [showAddItemInput, setShowAddItemInput] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const { mutate: createChecklistItem } = useCreateChecklistItem();
  const { mutate: updateChecklistItem } = useUpdateChecklistItem();
  const { mutate: deleteChecklistItem } = useDeleteChecklistItem();

  const onItemCheckChange = (checked, item) => {
    const updatedItem = { ...item, completed: checked };
    const updatedItems = checklistItems.map((i) =>
      i.id === item.id ? updatedItem : i,
    );
    setChecklistItems(updatedItems);

    // Update the item in the database
    updateChecklistItem({
      id: item.id,
      completed: checked,
      taskId,
    });
  };

  const handleAddItem = () => {
    if (newItemTitle.trim() !== "") {
      const newItem = {
        id: Date.now(), // Simple ID generation for example purposes
        title: newItemTitle,
      };
      // Save the new item to the database
      createChecklistItem({
        title: newItem.title,
        order: checklistItems.length,
        taskId,
      });

      setChecklistItems([...checklistItems, newItem]);
      setNewItemTitle(""); // Clear input after adding
      setShowAddItemInput(false); // Hide input field after adding
    }
  };

  const handleNewItemChange = (e) => {
    setNewItemTitle(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      handleAddItem();
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(checklistItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the order of the items in the database
    items.forEach((item, index) => {
      updateChecklistItem({
        id: item.id,
        order: index,
        taskId,
      });
    });

    setChecklistItems(items);
  };

  // edit item inline
  const toggleEditItem = (item) => {
    setEditingItemId(item.id);
    setEditingText(item.title);
  };

  const handleEditChange = (e) => {
    setEditingText(e.target.value);
  };

  const confirmEditItem = (e, item) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      const updatedItems = checklistItems.map((i) =>
        i.id === item.id ? { ...i, title: editingText } : i,
      );
      setChecklistItems(updatedItems);
      setEditingItemId(null);
      setEditingText("");

      // Update the item in the database
      updateChecklistItem({
        id: item.id,
        title: editingText,
        taskId,
      });
    }
  };

  const deleteItem = (item) => {
    const updatedItems = checklistItems.filter((i) => i.id !== item.id);
    setChecklistItems(updatedItems);

    // Delete the item from the database
    deleteChecklistItem({
      id: item.id,
      taskId,
    });
  };

  const getCompletedCount = () => {
    return checklistItems.filter((item) => item.completed).length;
  };

  return (
    <div className="task-checklist">
      <h2>
        Checklist{" "}
        {checklistItems?.length ? (
          <>
            ({getCompletedCount()}/{checklistItems?.length})
          </>
        ) : (
          ""
        )}
      </h2>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {checklistItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(innerProvided) => (
                    <div
                      ref={innerProvided.innerRef}
                      {...innerProvided.draggableProps}
                      {...innerProvided.dragHandleProps}
                      className="task-checklist__checklist-item"
                    >
                      {/* drag handle */}
                      <Ellipsis />

                      {editingItemId === item.id ? (
                        <Input
                          autoFocus
                          size="sm"
                          value={editingText}
                          onChange={handleEditChange}
                          onKeyPress={(e) => confirmEditItem(e, item)}
                        />
                      ) : (
                        <Checkbox
                          lineThrough
                          isDisabled={readonly}
                          isSelected={item.completed}
                          onValueChange={(value) =>
                            onItemCheckChange(value, item)
                          }
                        >
                          {item.title}
                        </Checkbox>
                      )}

                      {/* actions */}
                      <IconButton
                        icon={<Pencil />}
                        size="sm"
                        onClick={() => toggleEditItem(item)}
                      />

                      <IconButton
                        icon={<Close />}
                        size="sm"
                        color="danger"
                        onClick={() => deleteItem(item)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {showAddItemInput ? (
        <Input
          autoFocus
          size="sm"
          type="text"
          value={newItemTitle}
          onChange={handleNewItemChange}
          onKeyPress={handleKeyPress}
        />
      ) : (
        <Button
          variant="bordered"
          size="sm"
          isDisabled={readonly}
          onClick={() => setShowAddItemInput(true)}
        >
          Add option
        </Button>
      )}
    </div>
  );
}
TaskChecklist.defaultProps = {
  readonly: false,
};
TaskChecklist.propTypes = {
  taskChecklistItems: PropTypes.array.isRequired,
  taskId: PropTypes.string.isRequired,
  readonly: PropTypes.bool,
};

export default TaskChecklist;
