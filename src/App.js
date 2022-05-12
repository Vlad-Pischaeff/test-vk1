import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, Panel} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import User from './components/User';
import Friends from './components/Friends';
import Search from './components/Search';
import { searchUser, getToken, getFriends } from './Api';

const App = () => {
	const [user, setUser] = useState({});
	const [friends, setFriends] = useState([]);
	const [scheme, setScheme] = useState('bright_light')
	const [searchData, setSearchData] = useState(null);
	const [message, setMessage] = useState('');

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				setScheme(data.scheme)
			}
		});
		getToken();
	}, []);

	useEffect(() => {
		if (user?.id) {
			setMessage('ПОИСК ДРУЗЕЙ');
			getFriends(user.id)
				.then(({ items }) => setFriends(items));
			setMessage('');
		}
	}, [user]);

	const handlerChange = e => {
    setSearchData(e.target.value);
  }

	const handlerSubmit = async e => {
    e.preventDefault();
		setMessage('ПОИСК');
    let userLink = await searchUser(searchData);
    if (userLink.count) {
      setUser(userLink.items[0]);
      setMessage('');
    } else {
      setMessage('НЕТ ТАКОГО ПОЛЬЗОВАТЕЛЯ');
    }
  }

	return (
		<ConfigProvider scheme={scheme}>
			<AdaptivityProvider>
				<AppRoot>
					<View activePanel="search">
						<Panel id="search">
							<Search handlerChange={handlerChange} handlerSubmit={handlerSubmit} />
							{	message === 'ПОИСК' ? <ScreenSpinner />	: <User user={user} /> }
							{	message === 'ПОИСК ДРУЗЕЙ' ? <ScreenSpinner /> : <Friends friends={friends} />	}
						</Panel>
					</View>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
