import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";


export function TaskDetail () {
    const {id} = useParams();
    const navigate = useNavigate();
    const [taskStatus, setTaskStatus] = useState(null);

    const [data, loading, error] = useFetchData(`https://jsonplaceholder.typicode.com/todos/${id}`);

    //loading task status from localStorage to sync with the fetched data
    //so that after toggling a task status, on task detail page that change should be visible, not the fetched task status.
    useEffect(() => {
        if(data){
            try {
                const savedStatus = localStorage.getItem("task-status");
                if(savedStatus){
                    const statuses = JSON.parse(savedStatus);
                    //if this task has a saved task status then use that otherwise use the fetched status
                    setTaskStatus(
                        data.id in statuses ? statuses[data.id] : data.completed
                    ) 
                }else{
                    setTaskStatus(data.completed)
                }
            } catch (error) {
                console.error("Could not fetch task status", error);
            }
        }
    })
}
