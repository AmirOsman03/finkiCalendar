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
            .then(() => {
                console.log(`Successfully added the event!`);
                fetchEvents();
            })
            .catch((error) => console.log(error))
    }, [fetchEvents]);

    const onEdit = useCallback((id, eventData) => {
        eventRepository
            .updateEvent(id, eventData)
            .then(() => {
                console.log(`Successfully updated the event with ID ${id}.`);
                fetchEvents();
            })
            .catch((error) => console.log(error))
    }, [fetchEvents]);

    const onDelete = useCallback((id) => {
        eventRepository
            .deleteEvent(id)
            .then(() => {
                console.log(`Successfully deleted the event with ID ${id}.`);
                fetchEvents();
            })
            .catch((error) => console.log(error));
    }, [fetchEvents]);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    return {...state, onAdd: onAdd, onEdit: onEdit, onDelete: onDelete};
};

export default useEvents;