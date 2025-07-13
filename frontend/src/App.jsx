import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router";
import CalendarPage from "./ui/pages/CalendarPage.jsx";
import EventDetails from "./ui/components/Event/EventDetails.jsx";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<CalendarPage/>}/>
                <Route path={"events/:id"} element={<EventDetails/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
