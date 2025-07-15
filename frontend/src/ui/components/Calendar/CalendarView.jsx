import React from "react";
import useEvents from "../../../hooks/useEvents.js";
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    startOfWeek,
    endOfWeek,
} from "date-fns";
import {Link} from "react-router";
import {GoCalendar} from "react-icons/go";

const isSameCalendarDay = (date1, date2) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
};

const CalendarView = () => {
    const {events, loading} = useEvents();

    if (loading) return <p className="text-center text-gray-500">Loading events...</p>;

    const today = new Date();

    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(today);

    const calendarStart = startOfWeek(monthStart, {weekStartsOn: 0});
    const calendarEnd = endOfWeek(monthEnd, {weekStartsOn: 0});

    const calendarDays = eachDayOfInterval({
        start: calendarStart,
        end: calendarEnd,
    });

    return (
        <div className="p-3 mx-auto max-w-4xl">
            <div className="text-center mb-6">
                <div
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-full mb-4 shadow-lg">
                    <GoCalendar className={"w-5 h-5 mr-2"}/>
                    Academic Calendar
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent mb-4">
                    FINKI Calendar
                </h1>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Stay organized with your academic schedule and events
                </p>
            </div>
            <div className={"flex justify-center"}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    {format(monthStart, "MMMM yyyy")}
                </h2>
            </div>

            <div className="grid grid-cols-7 gap-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-sm text-center font-semibold text-gray-600">
                        {day}
                    </div>
                ))}
                {calendarDays.map((day) => {
                    const dayEvents = events.filter((event) =>
                        isSameCalendarDay(new Date(event.startTime), day)
                    );
                    const isCurrentMonth = day >= monthStart && day <= monthEnd;
                    return (
                        <div
                            key={day}
                            className={`
                                group
                                border rounded-lg 
                                p-1
                                min-h-[100px] 
                                shadow-sm 
                                flex flex-col 
                                transition 
                                duration-300 
                                ease-in-out 
                                cursor-pointer ${
                                isCurrentMonth
                                    ? "bg-white hover:bg-zinc-300 hover:text-red-500"
                                    : "bg-gray-100 text-gray-400"
                            }`}
                        >
                            <div className="text-xs font-bold">{format(day, "d")}</div>
                            <div className="mt-1 flex flex-col space-y-1 overflow-y-auto max-h-16">
                                {dayEvents.slice(0, 2).map((event) => (
                                    <Link
                                        to={`/events/${event.id}`}
                                        key={event.id}
                                        className="
                                        text-xs
                                            bg-gray-600
                                            text-white
                                            rounded-lg
                                            p-1
                                            group-hover:bg-gray-800
                                            transition
                                            duration-300
                                            ease-in-out"
                                    >
                                        {event.title}
                                    </Link>
                                ))}
                                {dayEvents.length > 2 && (
                                    <div className="text-xs text-gray-500 italic">
                                        +{dayEvents.length - 2} more
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarView;
