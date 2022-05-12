import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, Spinner, AdaptivityProvider, AppRoot, ConfigProvider, Panel, Cell} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import User from './components/User';
import Friends from './components/Friends';
import Search from './components/Search';
import { searchUser, getToken, getFriends } from './api/Api';

const App = () => {
	const [user, setUser] = useState({});
	const [friends, setFriends] = useState([]);
	const [scheme, setScheme] = useState('bright_light')
	const [searchData, setSearchData] = useState(null);
	const [message, setMessage] = useState(null);
	const [spinnerUser, setSpinnerUser] = useState(false);
	const [spinnerFriends, setSpinnerFriends] = useState(false);

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
			setSpinnerFriends(true);
			getFriends(user.id)
				.then(({ items }) => items && setFriends(items))
			setSpinnerFriends(false);
		}
	}, [user]);

	const handlerChange = e => {
    setSearchData(e.target.value);
  }

	const handlerSubmit = async e => {
    e.preventDefault();
		setFriends([]);
		setSpinnerUser(true);
    let userLink = await searchUser(searchData);
    if (userLink.items.length) {
      setUser(userLink.items[0]);
    } else {
			setUser({});
      setMessage('НЕТ ТАКОГО ПОЛЬЗОВАТЕЛЯ');
    }
		setSpinnerUser(false);
  }

	return (
		<ConfigProvider scheme={scheme}>
			<AdaptivityProvider>
				<AppRoot>
					<View activePanel="search">
						<Panel id="search">
							<Search handlerChange={handlerChange} handlerSubmit={handlerSubmit} />
							{	spinnerUser ? <Spinner />	: <User user={user} message={message} /> }
							{	spinnerFriends ? <Spinner /> : <Friends friends={friends} /> }
						</Panel>
					</View>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
