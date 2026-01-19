import { useState } from "react";
import { useFetchData } from "../hooks/useFetchData";
import { SearchBar } from "./SearchBar";

export function TaskList() {
    const [data, loading, error] = useFetchData('https://jsonplaceholder.typicode.com/todos');

    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = data?.filter((task) => {
        return task.title.toLowerCase().includes(searchTerm.toLowerCase())
    });
    
    if(loading){
        return (
            <p>Loading...</p>
        )
    }
    if(error){
        return(
            <p>Could not fetch data!</p>
        )
    }
    return (
        <>
            <h1>Task List</h1>

            <SearchBar 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            
            <div className="flex flex-wrap">
                {

                    filteredData?.map((task) => {
                        return (
                            <div key={task.id}
                                className="flex flex-col bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs"
                            >
                                <h2>Task Number: {task.id}</h2>
                                <h5 className="mb-3 flex flex-wrap text-2xl font-semibold tracking-tight text-heading leading-8">{task.title}</h5>
                                <p>Task Status: {task.completed ? 'DONE' : 'DUE'}</p>

                                <a href="#" className="inline-flex items-center text-black bg-brand box-border border hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                                    Task Details

                                </a>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}