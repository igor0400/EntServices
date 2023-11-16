export const getUserName = (user: any = {}) => {
  const userLink = user.user_name ? `https://t.me/${user.user_name}` : false;

  const name = `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim();

  const linkName = name !== '' ? name : user.id;

  const codeName =
    name !== '' ? `<code>${name}</code>` : `с id <code>${user.id}</code>`;

  const userName = userLink
    ? `<a href="${userLink}">${linkName}</a>`
    : codeName;

  return userName;
};
