export const updateLocalStorageData = (currentUser, itemsData) => {
    if (localStorage.getItem(`${currentUser.id}updatedamount1`)) {
        for (let i = 0; i < itemsData.length; i++) {
            if (itemsData[i].amount != localStorage.getItem(`${currentUser.id}updatedamount${i + 1}`)) {
                const remainder = localStorage.getItem(`${currentUser.id}updatedamount${i + 1}`) - itemsData[i].amount;
                localStorage.setItem(`${currentUser.id}amount${i + 1}`,
                    JSON.stringify(Number(localStorage.getItem(`${currentUser.id}amount${i + 1}`)) - remainder));
            }
        }
    }
    for (let i = 0; i < itemsData.length; i++) {
        localStorage.setItem(`${currentUser.id}updatedamount${i + 1}`, JSON.stringify(itemsData[i].amount));
    }
}

export const filterItems = (orderItems) => {
    return Object.values(
        orderItems.reduce((acc, obj) => {
            const { id } = obj;
            if (acc[id]) {
                acc[id].count++;
            } else {
                acc[id] = { ...obj, count: 1 };
            }
            return acc;
        }, {})
    );
}
