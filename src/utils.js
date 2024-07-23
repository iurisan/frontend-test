export const groupBy = function (data, key) {
  return data.reduce(function (storage, item) {
    var group = item[key];
    storage[group] = storage[group] || [];
    storage[group].push(item);
    return storage;
  }, {});
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
};
