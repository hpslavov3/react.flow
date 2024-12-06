import { useState, useEffect, useCallback } from 'react';

export default function FetchUsers() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);


    const fetchApi = useCallback(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => { return response.json() })
            .then(json => {
                setLoading(false);
                setData(json);
            });
    }, []);

    useEffect(() => {
        fetchApi();
    }, []);

    return (

        <> {
            loading ? <div>Still loading..</div> :
                data.map((elem, i) => {
                    <div>{elem.name}</div>
                })
        }
        </>
    )
}