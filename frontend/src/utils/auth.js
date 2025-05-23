const auth = {
  getToken: () => {
    return localStorage.getItem('token');
  },
  setToken: (token) => {
    localStorage.setItem('token', token);
  },
  clearToken: () => {
    localStorage.removeItem('token');
  },
  isAuthenticated: () => {
    return !!auth.getToken();
  }
}

export default auth;