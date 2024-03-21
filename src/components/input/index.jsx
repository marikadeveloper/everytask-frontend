import {
  Autocomplete, AutocompleteItem,
  Input as NuiInput,
  Select as NuiSelect,
  SelectItem,
  Tooltip,
} from "@nextui-org/react";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Close } from "../../assets/icons";
import { IconButton } from "../button";
import "./styles.scss";
import { useCategories } from "../../utils/category.js";

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
      <p className="emoji-picker__label">Emoji</p>
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

const CategoryInput = React.forwardRef((props, ref) => {
  const { categories } = useCategories();
  const [value, setValue] = useState(null);

  return (
    <Autocomplete
      label="Category"
      variant="bordered"
      defaultItems={categories}
      placeholder="Search a category"
      selectedKey={value}
      onSelectionChange={setValue}
      shouldCloseOnBlur
      ref={ref}
      {...props}
    >
      {(item) => <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>}
    </Autocomplete>
  );
});

export { EmojiInput, Input, Select, CategoryInput };
