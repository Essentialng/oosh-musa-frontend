import React from 'react'
import Header from '../../components/shared/Header'
import { Link } from 'react-router-dom'
import Button from '../../components/atoms/Button/Button'
import notFoundImage from '../../assets/others/404.jpeg'


const NotFound = () => {
  return (
    <div>
      <div className="w-screen flex items-start justify-center h-screen gap-10 overflow-hidden font-mono py-10">
        <div className="flex flex-row ">
          <div className="text-wrapper pt-8 w-[500px] p-20">
            <h2 className="text-6xl font-bold text-prim-500 mb-5">Ooops...</h2>
            <h3 className="text-2xl font-normal text-prim-500 text-input">
              Page not found
            </h3>
            <h4 className="my-6 text-lg font-normal">
              Check the url you entered and try again
            </h4>

            {/* <Link className="link text-primary-500 underline" to={"/"}> */}
            <Link to="/">
              {" "}
              <Button isDark={false} text='Go back Home' width="200px"/>
            </Link>
            {/* </Link> */}
          </div>
          <div className="w-full h-2/3">
            <img src={notFoundImage} alt="Page Not found" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound