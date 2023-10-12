export const loggerMiddleware = (store) => {
  return function (next) {
    return function (action) {
      console.log("log :" + action.type);
      next(action);
    };
  };
};
