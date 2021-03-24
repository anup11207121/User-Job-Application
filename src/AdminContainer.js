import React,{useState,useEffect} from 'react'
import axios from 'axios'
import _ from 'lodash'
import JobList from './JobList'

const AdminContainer=(props)=>{
    const [userData,setUserData]=useState([])
    const [data,setData]=useState([])
    const [title,setTitle]=useState('')

    useEffect(()=>{
        axios.get('http://dct-application-form.herokuapp.com/users/application-forms')
            .then((response)=>{
                const result=response.data
                //console.log(result)
                setUserData(result)
            })
            .catch((err)=>{
                alert(err.message)
            })
    },[])
    

    const UniqueJobTitle= _.uniqBy(userData, 'jobTitle')
    //console.log(UniqueJobTitle)

    useEffect(()=>{
        filterData(title)
    },[userData])


    const filterData=(job)=>{
        const result=userData.filter((user)=>{
            //console.log(user)
            return user.jobTitle === job
        }) 
        //console.log(result)
        setData(result)
        setTitle(job)
    }

    const dateConversion=(inputDate)=>{
        const date = new Date(inputDate)
        const newDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
        return newDate
    }

    const handleChange=(e)=>{
        const result=e.target.value
        filterData(result)
        }

    const userShortList=(list)=>{
        const result=userData.map((user)=>{
            if(user._id===list._id){
                return {...user , ...list}
            }else{
                return {...user}
            }
        })
        setUserData(result)
    }
    
    const userRejectList=(list)=>{
        const result=userData.map((user)=>{
            if(user._id===list._id){
                return {...user , ...list}
            }else{
                return {...user}
            }
        })
        setUserData(result)
    }

    return (
        <div>
            <h1>Admin Container</h1>
            <h2>Number of Applicants - {userData.length}</h2>
            {UniqueJobTitle.map((ele)=>{
                return (
                    <button key={ele._id} onClick={handleChange} value={ele.jobTitle}>{ele.jobTitle} </button>   
                    )
            })}
            <br/>

            
            <h2>List of {data.length} Candidates for {title} </h2>
            <JobList dateConversion={dateConversion} data={data} userShortList={userShortList} userRejectList={userRejectList}/>
        </div>
    )
}
export default AdminContainer