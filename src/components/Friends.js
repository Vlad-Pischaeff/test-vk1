import { Group, Header, Cell, Avatar } from '@vkontakte/vkui';

const Friends = ({ friends }) => {

  let list = friends.map(friend =>
    <div key={friend.id}>
      <Cell before={<Avatar src={friend.photo_100} />} 
        description={(friend.bdate ?? '') + ' ' + (friend?.city?.title ?? '')} >
        {friend.first_name} {friend.last_name}
      </Cell>
    </div>
  );
  
  return (
    friends.length
      ? <Group header={<Header mode="secondary">Друзья</Header>}>
          { list }
        </Group>
      : <div></div>
  );
};

export default Friends;