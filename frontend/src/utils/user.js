const user = {
  getUserInfo: () => {
    return localStorage.getItem('userInfo');
  },
  setUserInfo: (userInfo) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  },
  clearUserInfo: () => {
    localStorage.removeItem('userInfo');
  }
}

export default user;