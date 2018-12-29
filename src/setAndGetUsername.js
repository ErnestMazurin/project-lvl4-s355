import cookies from 'js-cookie';
import faker from 'faker';

const USERNAME_COOKIE = 'username';

export default () => {
  const username = cookies.get(USERNAME_COOKIE);
  if (username !== undefined) {
    return username;
  }

  const newName = faker.name.findName();
  cookies.set(USERNAME_COOKIE, newName);
  return newName;
};
