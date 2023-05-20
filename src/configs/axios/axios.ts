const config = (token: string) => {
    return {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
};

export default config;
