import React,{useState} from 'react'
import axios from 'axios'


const Form=(props)=>{
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [phone,setPhone]=useState('')
    const [jobTitle,setJobTitle]=useState('')
    const [experience,setExperience]=useState('')
    const [skills,setSkills]=useState('')
    const [formErrors,setFormErrors]=useState({})
    
    const errors={}
    
    const handleChange=(e)=>{
        const attr=e.target.name
        if(attr==='name'){
            setName(e.target.value)
        }else if(attr==='email'){
                setEmail(e.target.value)
            }else if(attr==='phone'){
                    setPhone(e.target.value)
                }else if(attr==='jobTitle'){
                        setJobTitle(e.target.value)
                    }else if(attr==='experience'){
                            setExperience(e.target.value)
                        }else if(attr==='skills'){
                                setSkills(e.target.value)
                            }
                        }

    const runValidation=()=>{
        //name
        if(name.length===0){
            errors.name='name Cannot be Blank'
        }
        //email
        if(email.trim().length===0){
            errors.email='email cannot be blank'
        }
        // else if(!validator.isEmail(email)){
        //     errors.email('invalid email format')
        // }
        //Contact number
        if(phone.trim().length===0){
            errors.phone='Enter the valid phone no'
        }
        //jobTitle
        if(jobTitle.length===0){
            errors.jobTitle='select job list'
        }
        //Experience
        if(experience.trim().length===0){
            errors.experience='experience cannot be blank'
        }
        //skills
        if(skills.trim().length===0){
            errors.skills='skills cannot be blank'
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault()

        runValidation()

        if(Object.keys(errors).length===0){
            setFormErrors({})
            const formData={
                name:name,
                email:email,
                phone:phone,
                jobTitle:jobTitle,
                experience:experience,
                skills:skills
            }
            console.log('formData',formData)
            axios.post(`https://dct-application-form.herokuapp.com/users/application-form`,formData)
                .then((response)=>{
                    const result=response.data
                    console.log(result)
                    setName('')
                    setEmail('')
                    setPhone('')
                    setJobTitle('')
                    setSkills('')
                    setExperience('')
                })
                .catch((err)=>{
                    alert(err.message)
                })    
        }else{
            setFormErrors(errors)
        }      
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Fullname-</label>
                <input type='text' value={name}  onChange={handleChange} name='name'/>
                { formErrors.name && <span>{formErrors.name}</span> }
                <br/><br/>
                <label>Email Address-</label>
                <input type='email' value={email} onChange={handleChange} name='email'/>
                { formErrors.email && <span>{formErrors.email}</span> }
                <br/><br/>
                <label>Contact-No</label> 
                <input type='text' value={phone} onChange={handleChange} name='phone'/>
                { formErrors.phone && <span>{formErrors.phone}</span> }
                <br/><br/>
                <label>Job Title</label>
                <select value={jobTitle} onChange={handleChange} name='jobTitle'>
                    <option value=''>...Select...</option>
                    <option value='Front-End Developer'>Front End Developer</option>
                    <option value='Node.js Developer'>Node.js Develper</option>
                    <option value='MEAN Stack Developer'>MEAN Stack Developer</option>
                    <option value='Full Stack Developer'>Full Stack Developer</option>
                </select>
                <br/><br/>
                <label>Experience</label>
                <input type='text' value={experience} onChange={handleChange} name='experience'/>
                { formErrors.experience && <span>{formErrors.experience}</span> }
                <br/><br/>
                <label>Technical Skills</label>
                <textarea value={skills} onChange={handleChange} name='skills'></textarea>
                { formErrors.skills && <span>{formErrors.skills}</span> }
                <br/><br/>
                <input type='submit' value='Send Application' />
            </form>
        </div>
    )
}

export default Form