import { useEffect, useState } from "react";
import { useFetchData } from "../hooks/useFetchData";
import { SearchBar } from "./SearchBar";
import { Spinner } from "./Spinner";

export function TaskList() {
    const [data, loading, error] = useFetchData('https://jsonplaceholder.typicode.com/todos');

    const [searchTerm, setSearchTerm] = useState('');
    const [taskStatus, setTaskStatus] = useState({})

    //filtering data based on search input
    const filteredData = data?.filter((task) => {
        return task.title.toLowerCase().includes(searchTerm.toLowerCase())
    });

    //toggle task status button between DONE & DUE
    const toggleTaskStatus = (taskId, currentStatus) => {
        setTaskStatus((prev) => ({
            ...prev,
            [taskId]: !currentStatus
        }));
    };

    //getting task statuses, first from the local state and then from the original data 
    const getTaskStatus = (task)=> {
        return (
            task.id in taskStatus ? taskStatus[task.id] : task.completed
        )
    }

    //saving task statuses on session storage
    useEffect(() => {
        if(Object.keys(taskStatus).length>0){
            try {
                sessionStorage.setItem("task-statuses", JSON.stringify(taskStatus));
            } catch (error) {
                console.error("Could not save task status", error);
            }
        }
    }, [taskStatus]);
    
    if(loading){
        return (
            <Spinner />
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-16">
                {

                    filteredData?.map((task) => {

                        
                        return (
                            <div key={task.id}
                                className="flex flex-col bg-neutral-primary-soft  max-w-sm p-6 border border-default rounded-base shadow-xs h-full"
                            >
                                <h2 className="mb-2">Task Number: {task.id}</h2>
                                <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">{task.title}</h5>
                                
                                <div className="flex justify-between items-center mb-4">
                                    <p className="font-medium">Task Status:</p>
                                    <button className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors
                                    ${
                                        isCompleted ? 
                                        "bg-green-100 text-green"
                                        : "bg-red-100 text-yellow"
                                    }`}
                                    onClick={() => toggleTaskStatus(task.id, isCompleted)}
                                    >
                                        DONE
                                    </button>
                                </div>

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