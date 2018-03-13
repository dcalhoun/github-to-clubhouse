exports.getIdFromBranch = name => {
  const match = RegExp(/\/ch(\d+)\//, 'g').exec(name);
  return match !== null ? match[1] : '';
};

exports.updateStory = id => {};
