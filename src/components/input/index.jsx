import { Input as NuiInput } from "@nextui-org/react";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Close } from "../../assets/icons";
import { Button, IconButton } from "../button";
import "./styles.scss";

const Input = React.forwardRef((props, ref) => {
  return <NuiInput variant="bordered" size="md" ref={ref} {...props} />;
});

function EmojiInput({ onEmojiChange }) {
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [emoji, setEmoji] = useState(null);

  const toggleEmojiPicker = () => {
    setEmojiPickerOpen(!emojiPickerOpen);
  };

  const onEmojiClick = ({ emoji, imageUrl, unified }) => {
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

// eslint-disable-next-line import/prefer-default-export
export { EmojiInput, Input };
