import React, { useEffect, useState } from "react"
import { deleteUserById, getAllUsers } from "../apiCalls/userApiCalls";

export function Dashboard() {

  const [values, setValues] = useState({
    allUsers: [],
    error: ""
  })
  const { allUsers, error } = values

  const preLoad = () => {

    getAllUsers().then(
      data => {
        if (data.error) {
          setValues({ ...values, error: data.error })
        }
        else {
          setValues({
            ...values,
            allUsers: data,
            error: ""
          })
        }
      }
    )

  }

  const deleteThisUser = Id => {
    deleteUserById(Id).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      }
      else {
        setValues({
          ...values,
        });
        alert("successfully deleted ")
        window.location.reload()
      }
    })
    console.log("user id deleted :-", Id)
  }



  useEffect(() => {
    preLoad()
  }, [])

  return (
    <div className="container">
      <h1>User Data :-</h1>
      <div className="container mt-4">
            {allUsers !==[] && allUsers.map((user, index) => {
              return (
                <div className="card container my-3 p-3 bg-dark text-light">
                  <h4 className="card-title">{user.userName}</h4>
                  <div className="card-body">
                    <p>User Name: {user.userName}</p>
                    <p>Phone Number: {user.phoneNumber}</p>
                    <p>Email: {user.email}</p>
                    <p>Address: {user.address}</p>
                    <button className="btn btn-outline-danger text-light"
                    onClick={()=>{
                      deleteThisUser(user._id)
                    }}
                    >Delete</button>
                  </div>
                </div>
              )
            })}

      </div>
    </div>
  )
}

