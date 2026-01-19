import { useEffect, useState } from "react";
import { useFetchData } from "../hooks/useFetchData";
import { SearchBar } from "./SearchBar";
import { Spinner } from "./Spinner";
import { Link } from "react-router-dom";

export function TaskList() {
    const [data, loading, error] = useFetchData('https://jsonplaceholder.typicode.com/todos');

    const [searchTerm, setSearchTerm] = useState('');
    const [taskStatus, setTaskStatus] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const taskPerPage = 20;

    //calculation for pagination
    const indexOfLastTask = currentPage * taskPerPage; //multiplying the current page number by 20(tasks per page) -> 1*20, 2*20
    const indexofFirstTask = indexOfLastTask - taskPerPage; //subtracting 20 from the last index to get the starting position 
    const currentTask = filteredData?.slice(indexofFirstTask, indexOfLastTask); //using slice to get the tasks for the current page. e.g: slice(20,40)->gets(item 20-39())
    const totalPages = Math.ceil((filteredData?.length || 0) / taskPerPage); //dividing total tasks by 20 to get total pages and rounding it up using math.ceil



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
                localStorage.setItem("task-statuses", JSON.stringify(taskStatus));
            } catch (error) {
                console.error("Could not save task status", error);
            }
        }
    }, [taskStatus]);

    //loading task statuses from the session storage when the component mounts so that it shows persistent task status
    useEffect(() => {
        try {
            const savedStatus = localStorage.getItem("task-statuses");
            if(savedStatus){
                setTaskStatus(JSON.parse(savedStatus));
            }
        } catch (error) {
            console.error("Could not load task statuses", error);
        }
    },[]);
    
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
                        const isCompleted = getTaskStatus(task); //getting the current status of the task.
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
                                        "bg-green-100 text-green-700 border border-green-300 hover:bg-green-200"
                                        : "bg-red-100 text-yellow"
                                    }`}
                                    onClick={() => toggleTaskStatus(task.id, isCompleted)}
                                    >
                                        {isCompleted ? "DONE" : "DUE"}
                                    </button>
                                </div>

                                <Link to={`/task/${task.id}`} 
                                className="inline-flex items-center text-black bg-brand box-border border mt-auto hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                                    Task Details

                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}