import Login from '../../../pages/Login'
import Homepage from '../../../pages/Homepage'
import Register from '../../../pages/Register'


const AuthTemplate = () => {
  const authenticated = false
  const filePath = window.location.pathname


  return (
    <div>
      {authenticated && <Homepage/>}
      {filePath === '/register' ? <Register/> : <Login/>}
    </div>
  )
}

export default AuthTemplate