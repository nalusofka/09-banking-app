import React from 'react';
import Body from '../Body';
import Title from '../Title';
import Avatar from 'react-avatar';
import './style.scss';

interface UserInfoProps {
  name?: string;
  lastname?: string;
  username?: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, lastname, username}) => {
  return (
    <div className='user-info'>
      <Avatar name={`${name} ${lastname}`} round='100px' color='#012b73' size='60' />
      <div className='user-info_content'>
        <Title as="h3" color='primary'>{name} {lastname}</Title>
        <Body color='primary'>{username}</Body>
      </div>
    </div>
  );
};

export default UserInfo;
