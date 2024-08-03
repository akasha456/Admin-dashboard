import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UserEdit() {
    const params = useParams();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getEventData();
    }, []);

    const getEventData = async () => {
        try {
            const response = await axios.get(`https://66abc8ddf009b9d5c730532d.mockapi.io/events/${params.id}`);
            myFormik.setValues(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const myFormik = useFormik({
        initialValues: {
            eventName: "",
            description: "",
            startDate: "",
            endDate: "",
            timings: "",
            days: "",
            venue: "",
            picture: ""
        },
        validate: (values) => {
            const errors = {};

            if (!values.eventName) {
                errors.eventName = "Event name is required";
            }

            if (!values.description) {
                errors.description = "Event description is required";
            }

            if (!values.startDate) {
                errors.startDate = "Start date is required";
            }

            if (!values.endDate) {
                errors.endDate = "End date is required";
            }

            if (!values.venue) {
                errors.venue = "Venue is required";
            }

            if (!values.timings) {
                errors.timings = "Timings are required";
            }

            if (!values.days) {
                errors.days = "Days are required";
            }

            if (!values.picture) {
                errors.picture = "Picture URL is required";
            } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(values.picture)) {
                errors.picture = "Invalid picture URL";
            }

            return errors;
        },
        onSubmit: async (values) => {
            try {
                setLoading(true);
                
                // Convert endDate to Unix timestamp
                const endDateTimestamp = Math.floor(new Date(values.endDate).getTime() / 1000);

                const updatedEvent = {
                    eventName: values.eventName,
                    description: values.description,
                    startDate: values.startDate, // Ensure this is in the correct format
                    endDate: endDateTimestamp,
                    timings: values.timings,
                    days: values.days,
                    venue: values.venue,
                    picture: values.picture
                };

                await axios.put(`https://66abc8ddf009b9d5c730532d.mockapi.io/events/${params.id}`, updatedEvent);
                navigate("/portal/user-list2");
            } catch (error) {
                console.error(error);
                alert("Update failed");
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <>
            <h3>Event Edit - Id: {params.id} </h3>
            <div className='container'>
                <form onSubmit={myFormik.handleSubmit}>
                    <div className='row'>
                        <div className="col-lg-6">
                            <label>Event Name</label>
                            <input 
                                name='eventName' 
                                value={myFormik.values.eventName} 
                                onChange={myFormik.handleChange} 
                                type="text"
                                className={`form-control ${myFormik.errors.eventName ? "is-invalid" : ""}`} 
                            />
                            <span style={{ color: "red" }}>{myFormik.errors.eventName}</span>
                        </div>

                        <div className="col-lg-6">
                            <label>Description</label>
                            <input 
                                name='description' 
                                value={myFormik.values.description} 
                                onChange={myFormik.handleChange} 
                                type="text"
                                className={`form-control ${myFormik.errors.description ? "is-invalid" : ""}`} 
                            />
                            <span style={{ color: "red" }}>{myFormik.errors.description}</span>
                        </div>

                        <div className='col-lg-4'>
                            <label>Start Date</label>
                            <input
                                name='startDate'
                                type='date'
                                value={myFormik.values.startDate}
                                onChange={myFormik.handleChange}
                                className={`form-control ${myFormik.errors.startDate ? "is-invalid" : ""}`}
                            />
                            <span style={{ color: "red" }}>{myFormik.errors.startDate}</span>
                        </div>

                        <div className='col-lg-4'>
                            <label>End Date</label>
                            <input
                                name='endDate'
                                type='date'
                                value={myFormik.values.endDate}
                                onChange={myFormik.handleChange}
                                className={`form-control ${myFormik.errors.endDate ? "is-invalid" : ""}`}
                            />
                            <span style={{ color: "red" }}>{myFormik.errors.endDate}</span>
                        </div>

                        <div className='col-lg-4'>
                            <label>Timings</label>
                            <input 
                                name='timings' 
                                value={myFormik.values.timings} 
                                onChange={myFormik.handleChange}
                                type="text"
                                className={`form-control ${myFormik.errors.timings ? "is-invalid" : ""}`} 
                            />
                            <span style={{ color: "red" }}>{myFormik.errors.timings}</span>
                        </div>

                        <div className='col-lg-4'>
                            <label>Days</label>
                            <input 
                                name='days' 
                                value={myFormik.values.days} 
                                onChange={myFormik.handleChange}
                                type="text"
                                className={`form-control ${myFormik.errors.days ? "is-invalid" : ""}`} 
                            />
                            <span style={{ color: "red" }}>{myFormik.errors.days}</span>
                        </div>

                        <div className='col-lg-4'>
                            <label>Venue</label>
                            <input 
                                name='venue' 
                                value={myFormik.values.venue} 
                                onChange={myFormik.handleChange}
                                type="text"
                                className={`form-control ${myFormik.errors.venue ? "is-invalid" : ""}`} 
                            />
                            <span style={{ color: "red" }}>{myFormik.errors.venue}</span>
                        </div>

                        <div className='col-lg-4'>
                            <label>Picture URL</label>
                            <input 
                                name='picture' 
                                value={myFormik.values.picture} 
                                onChange={myFormik.handleChange}
                                type="text"
                                className={`form-control ${myFormik.errors.picture ? "is-invalid" : ""}`} 
                            />
                            <span style={{ color: "red" }}>{myFormik.errors.picture}</span>
                        </div>

                        <div className='col-lg-4 mt-3'>
                            <input 
                                disabled={isLoading} 
                                type="submit" 
                                value={isLoading ? "Updating..." : "Update"} 
                                className='btn btn-primary' 
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default UserEdit;
