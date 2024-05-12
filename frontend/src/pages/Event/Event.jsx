import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

const Event = () => {
    const [event, setEvent] = useState({});
    const { id } = useParams(); 
    useEffect(() => {
        axios.get(`http://localhost:4000/fetch-event/${id}`)
        .then(res => {
            console.log(res.data)
            setEvent(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [id]); 

    return (
        <><div><h1>{event.title}</h1>
        <img src={event.image}/>
        </div>
            

        </>
    );
};

export default Event;
