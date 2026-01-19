import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";
import { Spinner } from "../components/Spinner";
import { ErrorMessage } from "../components/ErrorMessage";


export function TaskDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [taskStatus, setTaskStatus] = useState(null);

    const [data, loading, error] = useFetchData(`https://jsonplaceholder.typicode.com/todos/${id}`);

    //loading task status from localStorage to sync with the fetched data
    //so that after toggling a task status, on task detail page that change should be visible, not the fetched task status.
    useEffect(() => {
        if (data) {
            try {
                const savedStatus = localStorage.getItem("task-statuses");
                if (savedStatus) {
                    const statuses = JSON.parse(savedStatus);
                    //if this task has a saved task status then use that otherwise use the fetched status
                    setTaskStatus(
                        data.id in statuses ? statuses[data.id] : data.completed
                    )
                } else {
                    setTaskStatus(data.completed)
                }
            } catch (error) {
                console.error("Could not fetch task status", error);
            }
        }
    }, [data])

    //function to toggle the task status on the task detail page
    const toggleTaskStatus = () => {
        const newStatus = !taskStatus;
        setTaskStatus(newStatus);

        //updating the status on the local storage
        try {
            const savedStatus = localStorage.getItem("task-statuses");
            const statuses = savedStatus ? JSON.parse(savedStatus) : {};

            statuses[data.id] = newStatus;
            localStorage.setItem("task-statuses", JSON.stringify(statuses));
        } catch (error) {
            console.error("Could not save task status", error)
        }
    }

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
            <div className="min-h-screen bg-gray-50 mt-12 py-8 px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Details</h1>

                        <div className="space-y-4">
                            {/* Task Number */}
                            <div className="border-b pb-4">
                                <p className="text-sm text-gray-500 mb-1">Task Number</p>
                                <p className="text-xl font-semibold text-gray-800">{data?.id}</p>
                            </div>

                            {/* User ID */}
                            <div className="border-b pb-4">
                                <p className="text-sm text-gray-500 mb-1">User ID</p>
                                <p className="text-xl font-semibold text-gray-800">{data?.userId}</p>
                            </div>

                            {/* Task Title */}
                            <div className="border-b pb-4">
                                <p className="text-sm text-gray-500 mb-1">Task Title</p>
                                <p className="text-xl font-semibold text-gray-800">{data?.title}</p>
                            </div>

                            <div className="pb-4">
                                <p className="text-sm text-gray-500 mb-2">Status</p>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={toggleTaskStatus}
                                        className={`inline-block px-4 py-2 rounded-full text-sm font-semibold transition-colors ${taskStatus
                                                ? "bg-green-100 text-green-700 border border-green-300 hover:bg-green-200"
                                                : "bg-yellow-100 text-yellow-700 border border-yellow-300 hover:bg-yellow-200"
                                            }`}
                                    >
                                        {taskStatus ? "DONE" : "DUE"}
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <button onClick={() => navigate("/task-list")} className="m-6 font-medium text-blue-600 hover:text-blue-800">← Back to Task List</button>
                </div>
            </div>
        </>
    )
}
