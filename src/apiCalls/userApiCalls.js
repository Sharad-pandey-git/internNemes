 import {API} from  "../backend"

export const createUser = (newUser) => {
  return fetch(`${API}/create/user`, {
    method: "POST",
    headers : {
      Accept : "application/json",
      "Content-Type" : "application/json"
    },
    body: JSON.stringify( newUser )
  })
    .then(res => {
      return res.json();
    })
    .catch(error => console.log("Error in F-E in createUser : ", error))
}

export const getAllUsers = ()=>{
    return fetch(`${API}/allUsers`, {
        method:"GET"
    }).then(res=>{
        return res.json()
    }).catch(
        error => console.log("Error in F-E in GetAllUsers : ", error)
    )
}

export const deleteUserById = (user_id) =>{
  return fetch(`${API}/delete/user/${user_id}`,{
    method:"DELETE"
  }).then(res=>{
    return res.json();
  })
  .catch(
    error=> console.log("Error in F-E in DeleteUser : ", error)
  )
}