import { Group, Header, FormLayout, FormLayoutGroup, FormItem, Input, Button } from '@vkontakte/vkui';

const Search = ({ handlerSubmit, handlerChange, loading }) => {
  return (
    <Group header={<Header mode="secondary">Поиск пользователя</Header>}>
      <FormLayout onSubmit={handlerSubmit}>
        <FormLayoutGroup mode="vertical">
          <FormItem>
            <Input onChange={handlerChange}/>
          </FormItem>
    
          <FormItem>
            <Button size="l" stretched type="Submit" loading={loading} >
              Искать
            </Button>
          </FormItem>
        </FormLayoutGroup>
      </FormLayout>
    </Group>
  );
};

export default Search;