export const getHistoryIndex = (): number => {
  return window.history.state?.idx ?? 0;
};
