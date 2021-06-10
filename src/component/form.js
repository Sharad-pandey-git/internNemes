import React, { useEffect, useState } from "react"
import { createUser } from "../apiCalls/userApiCalls";

export function UserForm() {

  const [values, setValues] = useState({
    userName: "",
    phoneNumber: "",
    email: "",
    address: "",
    error: "",
    createduser: ""
  })
  const { userName, phoneNumber, email, address, error, createduser } = values

  useEffect(() => {

  }, [])

  const onSubmit = event => {
    event.preventDefault();
    var regX = /^[0-9a-zA-Z]+$/;
    if (userName === "" || email === "" || phoneNumber === "" || address === "") {
      setValues({
        ...values,
        error:"Please fillup all feilds , all fields are mandatory"
      })

    } else if (!userName.match(regX)) {
      setValues({
        ...values,
        error:"User Name Should Contain only AlphaNumeric value without any spaces"
      })

    } else if (phoneNumber.length != 10) {
      setValues({
        ...values,
        error:"Phone Number should be of 10 digits"
      })

    } else {
      var _user = {
        "userName": userName,
        "phoneNumber": phoneNumber,
        "email": email,
        "address": address
      }
      console.log("USER TO BE CREATED : ", _user)
      createUser(_user).then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error })
        }
        else {
          setValues({
            ...values,
            createduser: data,
            error: ""
          })
        }
  
      })
    }

  }

  const handelChange = name => event => {
    const value = event.target.value;
    setValues({ ...values, [name]: value })
  }


  const errorMessage = () => {
    return (<div className="alert-danger">
      {`ERROR : ${error}`}
    </div>
    )
  }
  const succesMessage = () => (
    <div className="alert-success">
      {`Added Successfully to DB`}
    </div>
  )


  return (
    <div className="bg-light">
      <div className="container mt-3 pt-5 text-center">
        <h2 className="fw-bold text-decoration-underline">DB Enrty Form</h2>

        <div className="text-start">
          <div className="container">
            <h4 className="mt-4 fst-italic">Fill The Form To Add A new User</h4>
            {error && errorMessage()}
            {createduser && succesMessage()}
            {/* ################################################# */}
            <form  className="py-2 row g-3 fw-bold" >
              <div className="col-md-6">
                <label htmlFor="validationDefault01" className="form-label" >User name</label>
                <input type="text"
                  name="userName"
                  value={userName}
                  onChange={handelChange("userName")}
                  className="form-control"
                  id="validationDefault01"
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="validationDefaultUsername" className="form-label">Phone Number</label>
                <input type="number"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handelChange("phoneNumber")}
                  className="form-control"
                  id="validationDefault02" required
                />
              </div>

              <div className="col-12">
                <label htmlFor="validationDefaultUsername" className="form-label" defaultValue="example@gmail.com">Email</label>
                <input type="email"
                  name="email"
                  value={email}
                  onChange={handelChange("email")}
                  className="form-control"
                  id="validationDefault02" required
                />
              </div>
              <div className="col-12">
                <label htmlFor="validationDefault01" className="form-label" >Address</label>
                <input type="text"
                  name="address"
                  value={address}
                  onChange={handelChange("address")}
                  placeholder="House Number /Locality/ City/ State "
                  className="form-control"
                  id="validationDefault01"
                  required
                />
              </div>
              <div className="col-12">
                <button className="btn btn-primary" onClick={onSubmit}
                >Submit form</button>
              </div>
              
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}