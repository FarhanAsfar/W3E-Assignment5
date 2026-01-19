import { useEffect, useState } from "react";

export function useFetchData(url) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
       setTimeout(function (){
         fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            })
       }, 1000)
    }, [url])

    return [data, loading, error];
}