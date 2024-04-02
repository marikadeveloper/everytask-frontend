import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { useUser } from "../../utils/user";
import "./styles.scss";

function UserDropdownMenu() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { data: user, isPending } = useUser();

  const onLogout = () => {
    navigate("/");
    logout();
  };

  if (isPending) {
    return null;
  }

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
          className="transition-transform flex-row-reverse user-dropdown-menu__trigger"
          description={user.level?.name}
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
        <DropdownItem key="logout" onClick={onLogout}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default UserDropdownMenu;
