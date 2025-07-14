import React from 'react';

const DeleteCalendarDialog = ({isOpen, onClose, onDelete, event}) => {
    const handleSubmit = () => {
        onDelete(event.id);
        onClose();
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-4">Delete Calendar</h2>
                <p className="mb-6">
                    Are you sure you want to delete this calendar{event && event.name ? `: "${event.name}"` : ''}?
                </p>
                <div className="flex justify-end space-x-2">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={handleSubmit}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
};

export default DeleteCalendarDialog;