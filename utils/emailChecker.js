import emailExistence from "email-existence";

const checkEmailExistence = (email) => {
  return new Promise((resolve, reject) => {
    emailExistence.check(email, (err, exists) => {
      if (err) return reject(err);
      resolve(exists);
    });
  });
};
export default checkEmailExistence;
