export const getMapById = (list, propertyName = 'id') => {
    return list.reduce((result, item) => {
        const id = item[propertyName];
        result[id] = item;
        return result;
    }, { });
};

export const getGroupsBy = (list, propertyName) => {
    return list.reduce((result, item) => {
        const key = item[propertyName];

        if (result[key]) {
            result[key].push(item);
        }
        else {
            result[key] = [item];
        }

        return result;
    }, { });
};
