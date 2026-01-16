import { useFetchData } from "../hooks/useFetchData";

export function TaskList() {
    const [data] = useFetchData('https://jsonplaceholder.typicode.com/todos');

    return (
        <>
            <h1>Task List</h1>
            <div>
                {
                    data &&
                    data.map((task) => {
                        return (
                            <div key={task.id} style={{border:"2px solid blue", padding:"10px"}}>
                                <h2>{task.id}</h2>
                                <p>{task.title}</p>
                                <p>{task.completed}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}