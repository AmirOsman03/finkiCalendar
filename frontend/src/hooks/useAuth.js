import {useEffect, useState} from 'react';
import userRepository from "../repository/userRepository.js";

const initialState = {
    user: null,
};

const useAuth = () => {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        userRepository
            .getUserDetails()
            .then((response) => {
                setState(prevState => ({
                    ...prevState,
                    user: response.data
                }));
            })
            .catch((error) => console.log(error));
    }, []);

    return state;
};

export default useAuth;
