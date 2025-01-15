"use client";

import { FC } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

interface CalendarProps {
  events: any[];
  onDateClick: (arg: any) => void;
  onEventClick: (arg: any) => void;
  view: "user" | "profile";
}

const Calendar: FC<CalendarProps> = ({ events, onDateClick, onEventClick }) => {
  return (
    <div>
      <FullCalendar
        allDaySlot={false}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        slotDuration={"00:30:00"}
        selectable={true}
        dateClick={onDateClick}
        events={events}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        eventClick={onEventClick}
      />
    </div>
  );
};

export default Calendar;
