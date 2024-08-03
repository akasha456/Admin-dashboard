import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EventList() {
  const [eventList, setEventList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getEvents();
    console.log("welcome");
  }, []);

  const getEvents = async () => {
    try {
      const events = await axios.get("https://66abc8ddf009b9d5c730532d.mockapi.io/events");
      setEventList(events.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this event?");
      if (confirmDelete) {
        await axios.delete(`https://66abc8ddf009b9d5c730532d.mockapi.io/events/${id}`);
        getEvents();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Event List</h1>
        <Link to="/portal/create-user2" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />
          Create Event
        </Link>
      </div>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">DataTables</h6>
        </div>
        <div className="card-body">
          {isLoading ? (
            <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' alt="Loading..." />
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Event Name</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Timings</th>
                    <th>Venue</th>
                    <th>Picture</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Id</th>
                    <th>Event Name</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Timings</th>
                    <th>Venue</th>
                    <th>Picture</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
                <tbody>
                  {eventList.map((event) => (
                    <tr key={event.id}>
                      <td>{event.id}</td>
                      <td>{event.eventName}</td>
                      <td>{event.description}</td>
                      <td>{event.startDate}</td>
                      <td>{event.endDate}</td>
                      <td>{event.timings}</td>
                      <td>{event.venue}</td>
                      <td>{event.picture}</td>
                      <td>
                        <Link to={`/portal/event-view/${event.id}`} className='btn btn-primary btn-sm mr-1'>View</Link>
                        <Link to={`/portal/event-edit2/${event.id}`} className='btn btn-info btn-sm mr-1'>Edit</Link>
                        <button onClick={() => handleDelete(event.id)} className='btn btn-danger btn-sm mr-1'>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default EventList;
