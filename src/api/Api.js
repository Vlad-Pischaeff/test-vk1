import bridge from '@vkontakte/vk-bridge';

let TOKEN;

export const getToken = async() => {
  try {
    let response = await bridge.send("VKWebAppGetAuthToken", { 
      "app_id": 8163307, 
      "scope": "friends, status"
    });
    TOKEN = response.access_token;
    console.log('access_token...', TOKEN);
  } catch(e) {
    console.log('catch token error...', e);
  }
}

export const searchUser = async (user) => {
  try {
    let { response } = await bridge.send("VKWebAppCallAPIMethod", {
      "method": "users.search", 
      "request_id": "searchUser", 
      "params": {
        "q": user, 
        "v": 5.131, 
        "access_token": TOKEN,
        "fields": "sex, city, bdate, photo_200",
      }
    });
    console.log('user...', response);
    return response;
  } catch(e) {
    console.log('catch user error...', e);
  }
}

export const getFriends = async (userId) => {
  try {
    let { response } = await bridge.send("VKWebAppCallAPIMethod", {
      "method": "friends.get",
      "request_id": "searchFriends",
      "params": {
        "user_id": userId,
        "v": 5.131, 
        "access_token": TOKEN,
        "fields": "sex, city, bdate, photo_100, nickname",
      }
    });
    console.log('friends...', response);
    return response;
  } catch(e) {
    return ('catch friends error...', e);
  }
}