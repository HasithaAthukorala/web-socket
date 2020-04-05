
exports.checkAvailableUsers = (currentUsers,currentUserId) => {

    console.log(currentUsers);

    const freeUsers = Object.keys(currentUsers).filter(userId => userId !== currentUserId && currentUsers[userId].roomId !== null && !currentUsers[userId].isEngaged) ;

    return freeUsers;

};


exports.shuffle = (a) => {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
};
