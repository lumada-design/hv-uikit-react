const authenticate = async credentials =>
  new Promise((resolve, reject) => {
    const { username, password } = credentials;

    setTimeout(() => {
      if (username !== "admin" || password !== "password") reject();
      resolve();
    }, 500);
  });

const recoverPassword = async email =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email.length) reject();
      resolve();
    }, 500);
  });

export { authenticate, recoverPassword };
