function apiHandler(url, method = 'GET') {
    return fetch(process.env.API_URL + url, {
        method,
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
        .then(result => result)
        .catch(error => error);
}

const getSection5Data = async () => {
    const data = {};
    const { title } = await getSectionData(5);
    const { data: list } = await apiHandler('/api');

    data.title = title;
    data.list = list;

    return data;
};

export const getMainPageAPIData = async () => {
    const section_5 = await getSection5Data();

    return {
        section_5
    };
};
