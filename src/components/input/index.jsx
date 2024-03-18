import {
  Input as NuiInput,
  Select as NuiSelect,
  SelectItem,
} from "@nextui-org/react";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Close } from "../../assets/icons";
import { Button, IconButton } from "../button";
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
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [emoji, setEmoji] = useState(null);

  const toggleEmojiPicker = () => {
    setEmojiPickerOpen(!emojiPickerOpen);
  };

  const onEmojiClick = ({ unified }) => {
    setEmojiPickerOpen(false);
    setEmoji(unified);
    onEmojiChange(unified);
  };

  const removeEmoji = () => {
    setEmoji(null);
    onEmojiChange(null);
  };

  return (
    <div className="emoji-picker">
      <div className="emoji-picker__preview">
        {emoji && <Emoji unified={emoji} size="32" />}
        <Button variant="bordered" size="sm" onClick={toggleEmojiPicker}>
          Emoji
        </Button>
        {emoji && (
          <IconButton
            size="sm"
            startContent={<Close />}
            onClick={removeEmoji}
          />
        )}
      </div>
      <EmojiPicker open={emojiPickerOpen} onEmojiClick={onEmojiClick} />
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

export { EmojiInput, Input, Select };
