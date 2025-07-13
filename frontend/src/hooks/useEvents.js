import {useCallback, useEffect, useState} from 'react';
import eventRepository from "../repository/eventRepository.js";

const initialState = {
    "events": [],
    "loading": true,
}

const useEvents = () => {
    const [state, setState] = useState(initialState);

    const fetchEvents = useCallback(() => {
        setState(initialState);
        eventRepository
            .getAllEvents()
            .then((response) => {
                setState({
                    events: response.data,
                    loading: false
                });
            })
            .catch((error) => console.log(error));
    }, []);

    const onAdd = useCallback((eventData) => {
        eventRepository
            .createEvent(eventData)
            .then(() => fetchEvents())
            .catch((error) => console.log(error))
    }, [fetchEvents])

    const onEdit = useCallback((id, eventData) => {
        eventRepository
            .updateEvent(id, eventData)
            .then(() => fetchEvents())
            .catch((error) => console.log(error))
    }, [fetchEvents])

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    return {...state, onAdd: onAdd, onEdit: onEdit};
};

export default useEvents;