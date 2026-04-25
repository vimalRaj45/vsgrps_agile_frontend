export const dispatchStorageRefresh = () => {
  window.dispatchEvent(new CustomEvent('storage-refresh'));
};
