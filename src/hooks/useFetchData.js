import { useEffect, useState } from "react";

export function useFetchData(url) {
    const [data, setData] = useState();

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setData(data));
    }, [url])

    return [data];
}