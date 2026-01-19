import { useEffect, useState } from "react";
import { useFetchData } from "../hooks/useFetchData";
import { SearchBar } from "../components/SearchBar";
import { Spinner } from "../components/Spinner";
import { Link } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { useTheme } from "../hooks/useTheme";

export function TaskList() {
    const { theme } = useTheme();
    const [data, loading, error] = useFetchData('https://jsonplaceholder.typicode.com/todos');

    const [searchTerm, setSearchTerm] = useState('');
    const [taskStatus, setTaskStatus] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const taskPerPage = 20;

    //filtering data based on search input
    const filteredData = data?.filter((task) => {
        return task.title.toLowerCase().includes(searchTerm.toLowerCase())
    });

    //calculation for pagination
    const indexOfLastTask = currentPage * taskPerPage; //multiplying the current page number by 20(tasks per page) -> 1*20, 2*20
    const indexofFirstTask = indexOfLastTask - taskPerPage; //subtracting 20 from the last index to get the starting position 
    const currentTask = filteredData?.slice(indexofFirstTask, indexOfLastTask); //using slice to get the tasks for the current page. e.g: slice(20,40)->gets(item 20-39())
    const totalPages = Math.ceil((filteredData?.length || 0) / taskPerPage); //dividing total tasks by 20 to get total pages and rounding it up using math.ceil


    //changing page according to page number
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    //when seaarch input changes, resetting the page to 1
    const handleSearchTermChange = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    }

    //toggle task status button between DONE & DUE
    const toggleTaskStatus = (taskId, currentStatus) => {
        setTaskStatus((prev) => ({
            ...prev,
            [taskId]: !currentStatus
        }));
    };

    //getting task statuses, first from the local state and then from the original data 
    const getTaskStatus = (task) => {
        return (
            task.id in taskStatus ? taskStatus[task.id] : task.completed
        )
    }

    //saving task statuses on session storage
    useEffect(() => {
        if (Object.keys(taskStatus).length > 0) {
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
            if (savedStatus) {
                setTaskStatus(JSON.parse(savedStatus));
            }
        } catch (error) {
            console.error("Could not load task statuses", error);
        }
    }, []);

    if (loading) {
        return (
            <Spinner />
        )
    }
    if (error) {
        return (
            <ErrorMessage />
        )
    }
    return (
        <>

            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={handleSearchTermChange}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 m-16">
                {
                    currentTask?.map((task) => {
                        const isCompleted = getTaskStatus(task); //getting the current status of the task.
                        return (
                            <div key={task.id}
                                className="flex flex-col bg-white dark:bg-slate-800 max-w-sm p-6 border border-slate-200  dark:border-slate-700 rounded-sl shadow-sm p-6 h-full"
                            >
                                <h2 className="mb-2  text-sm text-slate-500 dark:text-slate-300">Task Number: {task.id}</h2>

                                <h5 className="mb-3 text-lg font-semibold tracking-tight leading-8 text-slate-900 dark:text-white">{task.title}</h5>

                                <div className="flex justify-between items-center mb-6">

                                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Task Status:</p>

                                    <button className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors
                                    ${isCompleted ?
                                            "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 border border-green-300 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700 dark:hover:bg-green-800"
                                            : "bg-red-100 text-yellow dark:bg-red-900 dark:text-red-300 dark:border-red-700"
                                        }`}
                                        onClick={() => toggleTaskStatus(task.id, isCompleted)}
                                    >
                                        {isCompleted ? "DONE" : "DUE"}
                                    </button>
                                </div>

                                <Link to={`/task/${task.id}`}
                                    className=" mt-auto
                  inline-flex items-center justify-center
                  px-4 py-2 text-sm font-medium
                  rounded-lg
                  bg-slate-900 text-white
                  hover:bg-slate-800
                  dark:bg-blue-600 dark:hover:bg-blue-700
                  transition-colors">
                                    Task Details

                                </Link>
                            </div>
                        )
                    })}
            </div>

            {/* pagination view */}
            <div className="flex justify-center items-center gap-2 mt-8 mb-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                    Previous
                </button>

                <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (pageNum) => (
                            <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`px-3 py-2 border rounded-md ${currentPage === pageNum
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                {pageNum}
                            </button>
                        ),
                    )}
                </div>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                    Next
                </button>
            </div>
        </>
    )
}