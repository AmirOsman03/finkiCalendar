import React, {useState} from 'react';
import {useParams, useNavigate} from 'react-router';
import useEventDetails from '../../../hooks/useEventDetails.js';
import {format} from 'date-fns';
import {GoArrowLeft} from "react-icons/go";
import {FiEdit, FiTrash} from "react-icons/fi";
import EditCalendarDialog from '../EditCalendarDialog/EditCalendarDialog.jsx';
import useEvents from "../../../hooks/useEvents.js";
import useAuth from "../../../hooks/useAuth.js";
import DeleteCalendarDialog from "../DeleteCalendarDialog/DeleteCalendarDialog.jsx";

const EventDetailsPage = () => {
    const {id} = useParams();
    const {user} = useAuth();
    const navigate = useNavigate();
    const {onEdit, onDelete} = useEvents();
    const {event} = useEventDetails(id);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    if (!event) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading event details...</p>
            </div>
        </div>
    );

    return (
        <>
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="max-w-2xl w-full">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
                        <p className="text-gray-600">{event.description}</p>
                    </div>

                    {/* Edit Button positioned above the card */}
                    {user && (
                        <div className="flex justify-center mb-4 space-x-4">
                            <button
                                onClick={() => setEditDialogOpen(true)}
                                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                            >
                                <FiEdit className="w-4 h-4 mr-2"/>
                                Edit Event
                            </button>
                            <button
                                onClick={() => setDeleteDialogOpen(true)}
                                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                            >
                                <FiTrash className="w-4 h-4 mr-2"/>
                                Delete Event
                            </button>
                        </div>
                    )}

                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <div className="space-y-6">
                            <div>
                                <button
                                    onClick={() => navigate('/')}
                                    className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                                >
                                    <GoArrowLeft className={"w-5 h-5 mr-1"}/>
                                    Back to Home
                                </button>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Event Time</h3>
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-600">Start</p>
                                            <p className="text-xl font-bold text-gray-900">{format(new Date(event.startTime), "HH:mm")}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">End</p>
                                            <p className="text-xl font-bold text-gray-900">{format(new Date(event.endTime), "HH:mm")}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">{format(new Date(event.startTime), "EEEE, MMMM d, yyyy")}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Location</h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-gray-900">{event.location}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Laboratory</h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-gray-900">{event.laboratory}</p>
                                </div>
                            </div>

                            <div className="pt-4">
                                <div className="flex space-x-3">
                                    <button
                                        className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                        Add to Calendar
                                    </button>
                                    <button
                                        className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                                        Share Event
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <EditCalendarDialog
                isOpen={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                event={event}
                onUpdate={(updatedData) => onEdit(id, updatedData)}
            />
            <DeleteCalendarDialog
                isOpen={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onDelete={() => onDelete(id)}
                event = {event}
            />
        </>
    );
};

export default EventDetailsPage;
