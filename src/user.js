import localforage from 'localforage';

export async function getUsers() {
  let users = await localforage.getItem('users');
  if (!users) users = [];
  return users;
}

export async function createUser(info) {
  let user = { ...info, createdAt: Date.now() };
  let users = await getUsers();
  users.unshift(user);
  await setUser(users);
  return user;
}

function setUser(users) {
  return localforage.setItem('users', users);
}
