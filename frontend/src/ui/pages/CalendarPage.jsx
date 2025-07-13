import React, { useState } from "react";
import CalendarView from "../components/Calendar/CalendarView.jsx";
import AddCalendarDialog from "../components/AddCalendarDialog/AddCalendarDialog.jsx";
import useAuth from "../../hooks/useAuth.js";
import {HiOutlinePlus} from "react-icons/hi";
import useEvents from "../../hooks/useEvents.js";

const CalendarPage = () => {
    const {user} = useAuth();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const {onAdd} = useEvents();

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };

    const handleLogout = () => {
        fetch("http://localhost:8080/logout", {
            method: "POST",
            credentials: "include"
        }).then(() => {
            window.location.reload();
        });
    };

    return (
        <div className="bg-gradient-to-r from-white to-stone-200 min-h-screen">
            <div className="flex justify-between items-center p-4">
                <div className="flex items-center space-x-4">
                    {user && (
                        <button
                            onClick={() => setIsDialogOpen(true)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                        >
                            <HiOutlinePlus className="w-5 h-5" />
                            <span>Add Event</span>
                        </button>
                    )}
                </div>
                
                <div className="flex items-center space-x-4">
                    {user ? (
                        <div className="flex items-center space-x-4 bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                            <span>Welcome,</span>
                            <span className="font-semibold">{user.email}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-gray-300 text-black px-3 py-1 rounded-md hover:bg-gray-400 transition"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleGoogleLogin}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                        >
                            Login with Google
                        </button>
                    )}
                </div>
            </div>
            <CalendarView/>
            <AddCalendarDialog 
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onAdd={onAdd}
            />
        </div>
    );
};

export default CalendarPage;
