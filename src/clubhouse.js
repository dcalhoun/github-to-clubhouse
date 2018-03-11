exports.getIdFromBranch = name => RegExp(/\/ch(\d+)\//, 'g').exec(name)[1];
