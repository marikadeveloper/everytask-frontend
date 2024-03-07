import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import React from 'react';
import { useAuth } from '../../context/auth-context.jsx';
import { Avatar } from '../avatar.jsx';
import './styles.scss';

function UserDropdownMenu() {
  const { user, logout } = useAuth();

  return (
    <Dropdown placement='bottom-end'>
      <DropdownTrigger>
        <Avatar />
      </DropdownTrigger>
      <DropdownMenu
        className='user-dropdown-menu'
        disabledKeys={['user']}
        aria-label='Profile Actions'
        variant='flat'>
        <DropdownItem
          key='user'
          className='h-14 gap-2'
          textValue={'Signed in as ' + user.email}>
          <p className='font-medium'>Signed in as</p>
          <p className='font-medium'>{user.email}</p>
        </DropdownItem>
        <DropdownItem
          key='profile'
          href='/profile'>
          Profile
        </DropdownItem>
        <DropdownItem
          key='logout'
          onClick={logout}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export { UserDropdownMenu };
