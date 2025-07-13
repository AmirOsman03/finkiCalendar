import {useEffect, useState} from 'react';
import eventRepository from "../repository/eventRepository.js";

const initialState = {
    "event" : null,
};

const useEventDetails = (id) => {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        eventRepository
            .getEventById(id)
            .then((response) => {
                setState(prevState => ({
                    ...prevState,
                    event: response.data
                }))
            })
            .catch((error) => console.log(error));
    }, [id]);

    return state;
};

export default useEventDetails;