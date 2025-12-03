import React from 'react'

const Awards = () => {
  return (
    <div>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-6 p-5 '>
            <img src='media/images/largestBroker.svg' alt='largestBroker'/>
          </div>
          <div className='col-6 p-5'>

            <h1 className='mt-3'>Largest Stock broker in India</h1>
            <p className='mb-5'>2+ million Zerodha clients contribute to over 15% of all retail order volumes in India daily by trading and investing in:</p>

            <div className='row'>
              <div className='col-6'>
                <ul>
                  <li>
                    <p>Futures and Options</p>
                  </li>
                  <li>
                    <p>Commodity derivatives</p>
                  </li>
                  <li>
                    <p>Currency derivatives</p>
                  </li>
                </ul>
              </div>
              <div className='col-6'>
                <ul>
                  <li>
                    <p>Stocks & IPOs</p>
                  </li>
                  <li>
                    <p>Direct mutual funds</p>
                  </li>
                  <li>
                    <p>Bonds and Govt. Securities </p>
                  </li>
                </ul>
              </div>
            </div>
            <img src='media/images/pressLogos.png' style={{width:"98%"}}/>


          </div>
        </div>
      </div>
    </div>
  )
}

export default Awards
