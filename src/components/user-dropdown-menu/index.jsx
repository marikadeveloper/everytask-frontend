import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger, User,
} from "@nextui-org/react";
import { useAuth } from "../../context/auth-context";
import Avatar from "../avatar";
import "./styles.scss";

function UserDropdownMenu() {
  const { user, logout } = useAuth();

  return (
    <Dropdown placement="bottom-end" className="user-dropdown-menu">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            showFallback: true,
            name: "",
            src: "https://images.unsplash.com/broken",
          }}
          className="transition-transform flex-row-reverse"
          description={`Level ${user.level}`}
          name={user.name}
        />
      </DropdownTrigger>
      <DropdownMenu
        className="user-dropdown-menu__dropdown"
        disabledKeys={["user"]}
        aria-label="Profile Actions"
        variant="flat"
      >
        <DropdownItem
          key="user"
          className="h-14 gap-2"
          textValue={`Signed in as ${user.email}`}
        >
          <p className="font-medium">Signed in as</p>
          <p className="font-medium">{user.email}</p>
        </DropdownItem>
        <DropdownItem key="profile" href="/profile">
          Profile
        </DropdownItem>
        <DropdownItem key="logout" onClick={logout}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default UserDropdownMenu;
