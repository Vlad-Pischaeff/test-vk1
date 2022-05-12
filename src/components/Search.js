import { Group, Header, FormLayout, FormLayoutGroup, FormItem, Input, Button } from '@vkontakte/vkui';

const Search = ({ handlerSubmit, handlerChange }) => {
  return (
    <Group header={<Header mode="secondary">Поиск пользователя</Header>}>
      <FormLayout onSubmit={handlerSubmit}>
        <FormLayoutGroup mode="vertical">
          <FormItem>
            <Input onChange={handlerChange}/>
          </FormItem>
    
          <FormItem>
            <Button size="l" stretched type="Submit">
              Искать
            </Button>
          </FormItem>
        </FormLayoutGroup>
      </FormLayout>
    </Group>
  );
};

export default Search;