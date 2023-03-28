import React, { Component } from 'react'
import Rocket from './Rocket.gif'

const spinner = () =>  {
 
    return (
      <div className='container-div'>
        <img src={Rocket} alt="loading" />
      </div>
    )
  }


export default spinner
