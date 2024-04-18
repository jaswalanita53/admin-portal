import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { createEventId } from './eventUtils'

function CalendarComponent(props) {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [initialEvents, setInitialEvents] = useState([]);

useEffect(() => {
  // Check if props.roomCostData has changed
  if (props.roomCostData) {
    const data = props.roomCostData;
    const keys = Object.keys(data);

    const newdata = keys.map((key) => {
      return {
        id: createEventId(),
        title: "Room price " + data[key],
        start: key,
      };
    });
    setInitialEvents(newdata); // Update the state
  }
}, [props.roomCostData]);


  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  }

  const handleDateSelect = (selectInfo) => {
    // let title = prompt('Please enter a new title for your event')
    const calendarApi = selectInfo.view.calendar;
    props.setValue({
      startDate: selectInfo.startStr,
      endDate: selectInfo.endStr,
      startDateErrorMessage: '',
      endDateErrorMessage: ''
    });
    calendarApi.unselect(); // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     // title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   });
    // }
  }

  // const handleEventClick = (clickInfo) => {
  //   if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
  //     clickInfo.event.remove();
  //   }
  // }

  const handleEvents = (events) => {
    setCurrentEvents(events);
  }

  return (
    <div className='demo-app'>
      <div className='demo-app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          events={initialEvents}
          select={handleDateSelect}
          eventContent={renderEventContent}
          // eventClick={handleEventClick}
          eventsSet={handleEvents}
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
        />
      </div>
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default CalendarComponent;
