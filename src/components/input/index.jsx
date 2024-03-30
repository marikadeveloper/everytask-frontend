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
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import toast from "react-hot-toast";
import { Close } from "../../assets/icons";
import { useCategories, useCreateCategory } from "../../utils/category";
import { IconButton } from "../button";

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

function EmojiInput({ onEmojiChange, defaultEmoji = null }) {
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(true);
  const [emoji, setEmoji] = useState(null);

  useEffect(() => {
    if (defaultEmoji) {
      setEmoji(defaultEmoji);
    }
  }, [defaultEmoji]);

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
            <IconButton
              size="sm"
              color="danger"
              icon={<Close />}
              onClick={removeEmoji}
            />
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
EmojiInput.defaultProps = {
  defaultEmoji: null,
};
EmojiInput.propTypes = {
  onEmojiChange: PropTypes.func.isRequired,
  defaultEmoji: PropTypes.string,
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
      itemKey = "value",
      itemLabel = "label",
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
        {(item) => (
          <SelectItem key={item[itemKey]}>{item[itemLabel]}</SelectItem>
        )}
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
  itemKey: "value",
  itemLabel: "label",
};
Select.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  defaultSelectedKeys: PropTypes.array,
  items: PropTypes.array.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  variant: PropTypes.string,
  itemKey: PropTypes.string,
  itemLabel: PropTypes.string,
};

function CategoryInput({ onCategoryChange, preselectedCategory = null }) {
  const { categories } = useCategories();
  const { mutate: createCategory } = useCreateCategory();
  const [value, setValue] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [autocompleteKey, setAutocompleteKey] = useState(0);

  useEffect(() => {
    if (preselectedCategory) {
      setValue(preselectedCategory);
    }
  }, [preselectedCategory]);

  const onSelectionChange = (selected) => {
    if (selected === "new-category-option") {
      handleNewCategory();
    } else {
      setValue(selected);
      onCategoryChange(selected);
    }
  };

  const handleNewCategory = () => {
    if (inputValue.trim() === "") {
      console.error("Category name cannot be empty");
      toast.error("Category name cannot be empty");
      return;
    }

    setIsPending(true);
    createCategory(
      { name: inputValue },
      {
        onSuccess: (newCategoryId) => {
          setIsPending(false);
          console.log(`Category created successfully.`);
          toast.success(`Category created successfully.`);
          setValue(newCategoryId);
          onCategoryChange(newCategoryId);
          setInputValue("");
          setAutocompleteKey((prevKey) => prevKey + 1);
        },
        onError: (error) => {
          console.error(`Failed to create category: ${error.message}`);
          toast.error(`Failed to create category: ${error.message}`);
          setIsPending(false);
        },
      },
    );
  };

  const onInputChange = (value) => {
    setInputValue(value);
  };

  return (
    <div>
      <Autocomplete
        key={autocompleteKey}
        allowsCustomValue
        label="Category"
        variant="bordered"
        placeholder="Search or create a category"
        selectedKey={value}
        value={inputValue}
        onInputChange={onInputChange}
        onSelectionChange={onSelectionChange}
        fullWidth
      >
        {categories.map((item) => (
          <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
        ))}
        {inputValue &&
          !categories.some(
            (cat) => cat.name.toLowerCase() === inputValue.toLowerCase(),
          ) && (
            <AutocompleteItem key="new-category-option">
              {`Add "${inputValue}"`}
            </AutocompleteItem>
          )}
      </Autocomplete>
    </div>
  );
}
CategoryInput.defaultProps = {
  preselectedCategory: null,
};
CategoryInput.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
  preselectedCategory: PropTypes.string,
};

function DatetimePicker({ onDateChange, date = new Date() }) {
  const [value, onValueChange] = useState(date);

  const onChange = (newValue) => {
    onValueChange(newValue);
    onDateChange(newValue);
  };

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

DatetimePicker.defaultProps = {
  date: new Date(),
};
DatetimePicker.propTypes = {
  date: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func.isRequired,
};

export { CategoryInput, DatetimePicker, EmojiInput, Input, Select };
