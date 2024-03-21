import {
  Autocomplete,
  AutocompleteItem,
  Input as NuiInput,
  Select as NuiSelect,
  SelectItem,
  Tooltip,
} from "@nextui-org/react";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { Close } from "../../assets/icons";
import { IconButton } from "../button";
import { useCategories } from "../../utils/category";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "./styles.scss";

const Input = React.forwardRef(({ className, ...rest }, ref) => {
  return (
    <NuiInput
      className={`input ${className || ""}`}
      ref={ref}
      size="md"
      variant="bordered"
      {...rest}
    />
  );
});
Input.defaultProps = {
  className: "",
};
Input.propTypes = {
  className: PropTypes.string,
};

function EmojiInput({ onEmojiChange }) {
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(true);
  const [emoji, setEmoji] = useState(null);

  const onEmojiClick = ({ unified }) => {
    setEmojiPickerOpen(false);
    setEmoji(unified);
    onEmojiChange(unified);
  };

  const removeEmoji = () => {
    setEmojiPickerOpen(true);
    setEmoji(null);
    onEmojiChange(null);
  };

  return (
    <div className="emoji-picker">
      <p className="label emoji-picker__label">Emoji</p>
      <div className="emoji-picker__picker">
        <div className="emoji-picker__picker__preview">
          {emoji && (
            <Tooltip content="Change emoji">
              <button
                type="button"
                aria-label="Selected emoji"
                onClick={() => setEmojiPickerOpen(true)}
                style={{ background: "none", border: "none" }}
              >
                <Emoji unified={emoji} size="32" />
              </button>
            </Tooltip>
          )}
          {emoji && (
            <IconButton size="sm" icon={<Close />} onClick={removeEmoji} />
          )}
        </div>
        <EmojiPicker
          reactionsDefaultOpen
          open={emojiPickerOpen}
          onEmojiClick={onEmojiClick}
        />
      </div>

    </div>
  );
}

EmojiInput.propTypes = {
  onEmojiChange: PropTypes.func.isRequired,
};

const Select = React.forwardRef(
  (
    {
      className,
      color,
      defaultSelectedKeys,
      items,
      label,
      placeholder,
      variant,
      ...rest
    },
    ref,
  ) => {
    return (
      <NuiSelect
        className={`input ${className || ""}`}
        color={color}
        defaultSelectedKeys={defaultSelectedKeys}
        items={items}
        label={label}
        placeholder={placeholder}
        ref={ref}
        variant={variant}
        {...rest}
      >
        {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
      </NuiSelect>
    );
  },
);
Select.defaultProps = {
  className: "",
  color: "default",
  defaultSelectedKeys: [],
  label: "",
  placeholder: "",
  variant: "bordered",
};
Select.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  defaultSelectedKeys: PropTypes.array,
  items: PropTypes.array.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  variant: PropTypes.string,
};

function CategoryInput({ onCategoryChange }) {
  const { categories } = useCategories();
  const [value, setValue] = useState(null);
  const onSelectionChange = (selected) => {
    setValue(selected);
    onCategoryChange(selected);
  };

  return (
    <Autocomplete
      label="Category"
      variant="bordered"
      defaultItems={categories}
      placeholder="Search a category"
      selectedKey={value}
      onSelectionChange={onSelectionChange}
      shouldCloseOnBlur
    >
      {(item) => <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>}
    </Autocomplete>
  );
}
CategoryInput.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
};

function DatetimePicker({ onDateChange }) {
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    onDateChange(value);
  }, [onDateChange, value]);

  return (
    /* this is horrible */
    <div className="transition-colors border-default-200 border-medium rounded-medium shadow-sm !duration-150 px-3 hover:border-default-400 focus:border-default-foreground active:border-default-foreground py-1 datetime-picker">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="label" htmlFor="datetime-picker">
        Due date
      </label>
      <DateTimePicker
        id="datetime-picker"
        format="dd-MM-y h:mm a"
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
DatetimePicker.propTypes = {
  onDateChange: PropTypes.func.isRequired,
};

export { EmojiInput, Input, Select, CategoryInput, DatetimePicker };
