import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserCreate() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const myFormik = useFormik({
    initialValues: {
      eventname: "",
      organizers: "",
      venue: "",
      date: "",
      registeredusers: ""
    },
    validate: (values) => {
      let errors = {};

      if (!values.eventname) {
        errors.eventname = "Event name is required";
      }

      if (!values.organizers) {
        errors.organizers = "Please enter organizers";
      }

      if (!values.venue) {
        errors.venue = "Please select a city";
      }

      if (!values.date) {
        errors.date = "Please select a date";
      }

      if (!values.registeredusers) {
        errors.registeredusers = "Please select the number of registered users";
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.post("https://66abc8ddf009b9d5c730532d.mockapi.io/events", values);
        navigate("/portal/user-list2");
      } catch (error) {
        console.log(error);
        alert("Submission failed");
        setLoading(false);
      }
    }
  });

  return (
    <div className='container'>
      <form onSubmit={myFormik.handleSubmit}>
        <div className='row'>
          <div className="col-lg-6">
            <label>Event Name</label>
            <input 
              name='eventname' 
              value={myFormik.values.eventname} 
              onChange={myFormik.handleChange} 
              type={"text"}
              className={`form-control ${myFormik.errors.eventname ? "is-invalid" : ""}`} 
            />
            <span style={{ color: "red" }}>{myFormik.errors.eventname}</span>
          </div>

          <div className="col-lg-6">
            <label>Organizers</label>
            <input 
              name='organizers' 
              value={myFormik.values.organizers} 
              onChange={myFormik.handleChange} 
              type={"text"}
              className={`form-control ${myFormik.errors.organizers ? "is-invalid" : ""}`} 
            />
            <span style={{ color: "red" }}>{myFormik.errors.organizers}</span>
          </div>

          <div className='col-lg-4'>
            <label>Venue</label>
            <select 
              name='venue' 
              value={myFormik.values.venue} 
              onChange={myFormik.handleChange}
              className={`form-control ${myFormik.errors.venue ? "is-invalid" : ""}`} 
            >
              <option value="">----Select----</option>
              <option value="CN">Chennai</option>
              <option value="KN">Kochin</option>
              <option value="MU">Mumbai</option>
              <option value="SA">Seattle</option>
              <option value="MI">Miami</option>
              <option value="VB">Virginia Beach</option>
            </select>
            <span style={{ color: "red" }}>{myFormik.errors.venue}</span>
          </div>

          <div className='col-lg-4'>
            <label>Date</label>
            <input
              name='date'
              type='date'
              value={myFormik.values.date}
              onChange={myFormik.handleChange}
              className={`form-control ${myFormik.errors.date ? "is-invalid" : ""}`}
            />
            <span style={{ color: "red" }}>{myFormik.errors.date}</span>
          </div>

          <div className='col-lg-4'>
            <label>Registered Users</label>
            <select 
              name='registeredusers' 
              value={myFormik.values.registeredusers} 
              onChange={myFormik.handleChange}
              className={`form-control ${myFormik.errors.registeredusers ? "is-invalid" : ""}`} 
            >
              <option value="">----Select----</option>
              <option value="0-100">0-100</option>
              <option value="101-500">101-500</option>
              <option value="501-1000">501-1000</option>
              <option value="1001-5000">1001-5000</option>
              <option value="5001+">5001+</option>
            </select>
            <span style={{ color: "red" }}>{myFormik.errors.registeredusers}</span>
          </div>

          <div className='col-lg-4 mt-3'>
            <input 
              disabled={isLoading} 
              type="submit" 
              value={isLoading ? "Submitting..." : "Create"} 
              className='btn btn-primary' 
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserCreate;
