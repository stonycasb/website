import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ICAL from 'ical.js';

export default function EventCalendar() {
  const [events, setEvents] = useState([]);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    // Fetch the ICS file using a CORS proxy
    const icsUrl = 'https://calendar.google.com/calendar/ical/4kki6p5cjl2oacr0eq9ei6ojsc%40group.calendar.google.com/public/basic.ics';

    console.log('Fetching calendar data...');

    fetch(`https://corsproxy.io/?${encodeURIComponent(icsUrl)}`)
      .then(response => {
        console.log('Calendar response received:', response.status);
        return response.text();
      })
      .then(data => {
        console.log('Calendar data received, parsing...');
        // Parse the ICS data
        const jcalData = ICAL.parse(data);
        const comp = new ICAL.Component(jcalData);
        const vevents = comp.getAllSubcomponents('vevent');

        // Convert to FullCalendar events
        const parsedEvents = vevents.map(vevent => {
          const event = new ICAL.Event(vevent);
          return {
            title: event.summary,
            start: event.startDate.toJSDate(),
            end: event.endDate.toJSDate(),
            extendedProps: {
              description: event.description,
              location: event.location,
            },
          };
        });

        console.log('Events parsed:', parsedEvents.length);
        setEvents(parsedEvents);
      })
      .catch(error => {
        console.error('Error loading calendar:', error);
        // Set empty events array so calendar still shows
        setEvents([]);
      });
  }, []);

  const handleEventMouseEnter = (info) => {
    const event = info.event;
    const rect = info.el.getBoundingClientRect();

    setTooltip({
      title: event.title,
      start: event.start,
      end: event.end,
      description: event.extendedProps.description,
      location: event.extendedProps.location,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
      event: event,
    });
  };

  const handleEventMouseLeave = () => {
    setTooltip(null);
  };

  const handleEventClick = (info) => {
    info.jsEvent.preventDefault();

    // Generate "Add to Google Calendar" link
    const event = info.event;
    const title = encodeURIComponent(event.title);
    const start = event.start.toISOString().replace(/-|:|\.\d+/g, '');
    const end = event.end ? event.end.toISOString().replace(/-|:|\.\d+/g, '') : start;
    const details = encodeURIComponent(event.extendedProps.description || '');
    const location = encodeURIComponent(event.extendedProps.location || '');

    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;

    window.open(googleCalUrl, '_blank');
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: date.getHours() !== 0 ? 'numeric' : undefined,
      minute: date.getHours() !== 0 ? '2-digit' : undefined,
    });
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', position: 'relative' }}>
      <style>
        {`
          .fc {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          }
          .fc .fc-toolbar {
            margin-bottom: 1.5em;
          }
          .fc .fc-button {
            background-color: #da2928;
            border-color: #da2928;
            padding: 0.5em 1em;
            border-radius: 4px;
            font-weight: 500;
          }
          .fc .fc-button:hover {
            background-color: #c02524;
            border-color: #c02524;
          }
          .fc .fc-button:disabled {
            background-color: #ccc;
            border-color: #ccc;
          }
          .fc .fc-toolbar-title {
            font-size: 1.75em;
            font-weight: 600;
            color: #333;
          }
          .fc-theme-standard td, .fc-theme-standard th {
            border: 1px solid #ddd;
          }
          .fc-theme-standard .fc-scrollgrid {
            border: 1px solid #ddd;
          }
          .fc .fc-daygrid-day-top {
            padding: 8px;
          }
          .fc .fc-col-header-cell {
            background-color: #f8f9fa;
            font-weight: 600;
            padding: 12px;
          }
          .fc .fc-daygrid-day-number {
            padding: 8px;
            font-weight: 500;
          }
          .fc .fc-daygrid-day-frame {
            min-height: 120px;
          }
          .fc .fc-event {
            background-color: #da2928;
            border-color: #da2928;
            cursor: pointer;
            padding: 6px 8px;
            border-radius: 4px;
            color: white;
            font-size: 13px;
            white-space: normal;
            margin-bottom: 4px;
          }
          .fc .fc-event:hover {
            background-color: #c02524;
          }
          .fc .fc-daygrid-event {
            margin: 3px 2px;
            padding: 6px 8px;
          }
          .fc-event-title {
            color: white;
            font-weight: 500;
            overflow: visible;
            white-space: normal;
          }
          .fc-event-time {
            color: white;
            font-weight: 600;
            margin-right: 4px;
          }
          .fc .fc-daygrid-event-dot {
            display: none;
          }
        `}
      </style>

      {tooltip && (
        <div
          style={{
            position: 'fixed',
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translate(-50%, -100%)',
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 9999,
            maxWidth: '300px',
            minWidth: '250px',
          }}
        >
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: '#333' }}>
            {tooltip.title}
          </h3>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
            <div>{formatDate(tooltip.start)}</div>
            {tooltip.end && tooltip.start.toDateString() !== tooltip.end.toDateString() && (
              <div>to {formatDate(tooltip.end)}</div>
            )}
          </div>
          {tooltip.location && (
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
              <strong>Location:</strong> {tooltip.location}
            </div>
          )}
          {tooltip.description && (
            <div style={{ fontSize: '14px', color: '#666', maxHeight: '100px', overflowY: 'auto' }}>
              {tooltip.description}
            </div>
          )}
        </div>
      )}

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventMouseEnter={handleEventMouseEnter}
        eventMouseLeave={handleEventMouseLeave}
        eventClick={handleEventClick}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek',
        }}
        height="auto"
        eventColor="#da2928"
      />
    </div>
  );
}
