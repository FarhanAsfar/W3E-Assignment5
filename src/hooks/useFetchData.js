import { useEffect, useState } from "react";

export function useFetchData(url) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       setTimeout(function (){
         fetch(url)
            .then((res) => res.json())
            .then((data) => setData(data), setLoading(false));
       }, 2000)
    }, [url])

    return [data, loading];
}