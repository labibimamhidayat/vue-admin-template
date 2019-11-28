const setTokenToLocalStorage = (token) => {
    localStorage.setItem('token', `${token.token_type} ${token.access_token}`);
};

export {
    // eslint-disable-next-line import/prefer-default-export
    setTokenToLocalStorage,
};
