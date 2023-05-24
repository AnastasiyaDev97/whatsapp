const IsJsonString = (str: string): boolean => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
};

export const loadState = (key: string): string | undefined => {
  try {
    const serializedState = localStorage.getItem(key);

    if (serializedState === null) {
      return undefined;
    }

    if (IsJsonString(serializedState)) {
      return JSON.parse(serializedState);
    }

    return serializedState;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: any, key: string): void => {
  try {
    const serializedState = JSON.stringify(state);

    localStorage.setItem(key, serializedState);

    return;
  } catch (err) {
    console.log(err);
  }
};

export const clearState = (key: string): void => {
  localStorage.removeItem(key);
};
