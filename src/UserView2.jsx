import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function EventView() {
    const params = useParams();
    const [eventDetails, setEventDetails] = useState({});
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getEventDetails();
    }, [params.id]);

    const getEventDetails = async () => {
        try {
            // Fetch event details
            const eventResponse = await axios.get(`https://66abc8ddf009b9d5c730532d.mockapi.io/events/${params.id}`);
            setEventDetails(eventResponse.data);

            // Fetch registered users if present
            if (eventResponse.data.registeredusers) {
                const userRequests = eventResponse.data.registeredusers.map(userId =>
                    axios.get(`https://63a9bccb7d7edb3ae616b639.mockapi.io/users/${userId}`)
                );
                const userResponses = await Promise.all(userRequests);
                setRegisteredUsers(userResponses.map(response => response.data));
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <>
            <div>EventView - {params.id}</div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Event Details</h6>
                </div>
                <div className="card-body">
                    {isLoading ? (
                        <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' alt="Loading..." />
                    ) : (
                        <>
                            <div className="table-responsive">
                                <table className="table table-bordered" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Event Name</th>
                                            <th>Organizers</th>
                                            <th>Venue</th>
                                            <th>Date</th>
                                            <th>Registered Users Count</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Id</th>
                                            <th>Event Name</th>
                                            <th>Organizers</th>
                                            <th>Venue</th>
                                            <th>Date</th>
                                            <th>Registered Users Count</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        <tr>
                                            <td>{eventDetails.id}</td>
                                            <td>{eventDetails.eventname}</td>
                                            <td>{eventDetails.organizers}</td>
                                            <td>{eventDetails.venue}</td>
                                            <td>{eventDetails.date}</td>
                                            <td>{eventDetails.registeredusers?.length || 0}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="table-responsive mt-4">
                                <h6 className="m-0 font-weight-bold text-primary">Registered Users</h6>
                                <table className="table table-bordered" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th>User Id</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>City</th>
                                            <th>State</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>User Id</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>City</th>
                                            <th>State</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        {registeredUsers.map(user => (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>{user.city}</td>
                                                <td>{user.state}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default EventView;
