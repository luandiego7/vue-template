export const setLocalToken    = token => localStorage.setItem('token', token);
export const getLocalToken    = ()    => localStorage.getItem('token');
export const deleteLocalToken = ()    => localStorage.removeItem('token');

export const setLocalUser    = user => localStorage.setItem('user', JSON.stringify(user));
export const getLocalUser    = ()   => JSON.parse(localStorage.getItem('user'));
export const deleteLocalUser = ()   => localStorage.removeItem('user');
