import React from 'react'
import {Link,Route} from 'react-router-dom'
import AdminContainer from './AdminContainer'
import Form from './Form'

const App=(props)=>{
  return (
    <div>
      <h1>Users Job Application</h1>
      <ul>
        <li><Link to=''>Home</Link></li>
        <li><Link to='/users/application-forms'>Admin DashBoard</Link></li>
        <li><Link to='/users/application-form'>Form</Link></li>
      </ul>
      <Route path="/users/application-forms" component={AdminContainer} exact={true} />
      <Route path="/users/application-form" component={Form} exact={true} />
    </div>
  )
}

export default App