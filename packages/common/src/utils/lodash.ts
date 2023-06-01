export const debounced = (fn: any, delay: number) => {
  let timer: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      clearTimeout(timer);
      fn.apply(this, args);
    }, delay);
  };
};

export const randomNumberFromRange = (max: number, min: number = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generateId = () =>
  Math.ceil(Math.random() * Math.random() * Math.random() * 1000 * 1000 * 1000);

export const sleep = (timeInMS: number) =>
  new Promise((res) => setTimeout(res, timeInMS));
