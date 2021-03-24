import axios from 'axios'
import React from 'react'

const JobList=(props)=>{
    const {data,dateConversion, userShortList, userRejectList}=props

    const handleShortList=(id)=>{
        const confirm=window.confirm('Are you Sure')
        if(confirm){
            const status={status:'shortlisted'}
            axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${id}`,status)
                .then((response)=>{
                    const result=response.data
                    userShortList(result)
                })
                .catch((err)=>{
                    alert(err.message)
                })
        }
    }

    const handleReject=(id)=>{
        const confirm=window.confirm('Are you Sure')
        if(confirm){
            const status={status:'rejected'}
            axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${id}`,status)
                .then((response)=>{
                    const result=response.data
                    userRejectList(result)
                })
                .catch((err)=>{
                    alert(err.message)
                })
        }
    }

    const handleDetails=(id)=>{
         data.map((user)=>{
            if(user._id===id){
                alert(`
                Job Profile
                    Contact No- ${user.phone}
                    Email - ${user.email}
                    Skills - ${user.skills}
                    Experience - ${user.experience}
                `)
            }    
        })
    }

    return (
        <div>
            <table border='1'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Tutorial Skills</th>
                        <th>Experience</th>
                        <th>Applied Date</th>
                        <th>View Details</th>
                        <th>Update Application Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((data)=>{
                        return(
                    <tr key={data._id}>
                        <td>{data.name}</td>
                        <td>{data.skills}</td>
                        <td>{data.experience}</td>
                        <td>
                            {dateConversion(data.createdAt)}
                            </td>
                        <td><button onClick={()=>{
                            handleDetails(data._id)
                        }}>View Details</button></td>

                            {data.status==='applied' &&
                                <td>
                                    <button onClick={()=>{
                                        handleShortList(data._id)
                                    }}>ShortList</button>
                                   
                                    <button onClick={()=>{
                                        handleReject(data._id)
                                    }}>Reject</button>
                                </td>
                            }
                            {data.status==='shortlisted' &&
                                <td>
                                    <p>Shortlisted</p>
                                </td>
                            } 
                            {data.status==='rejected' &&
                                <td>
                                    <p>Rejected</p>
                                </td>
                            }  
                    </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default JobList