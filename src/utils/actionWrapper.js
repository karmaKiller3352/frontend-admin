const actionWrap = (action, resolveFunc, rejectFunc, ...args) => {
  return new Promise((resolve, reject) => {
    action(...args, resolve, reject);
  })
    .then((res) => {
      console.log("done1");
      resolveFunc(res);
    })
    .catch((rej) => {
      rejectFunc(rej);
    });
};

export default actionWrap;
