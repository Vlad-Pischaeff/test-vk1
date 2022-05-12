import { Group, Header, Cell, Avatar } from '@vkontakte/vkui';

const User = ({ user, message }) => {
  return (
    user.id 
      ? <Group header={<Header mode="secondary">Пользователь</Header>}>
          <Cell 
            before={user.photo_200 ? <Avatar size={100} src={user.photo_200}/> : null}
            description={user.city && user.city.title ? user.city.title : ''}>

            {`${user?.first_name} ${user?.last_name}`}
          </Cell>
        </Group>
      : <Cell>{message}</Cell>
  );
};

export default User;