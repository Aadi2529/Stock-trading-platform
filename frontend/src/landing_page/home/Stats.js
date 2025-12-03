import React from 'react'

const Stats = () => {
  return (
    <div>
      <div className='container p-5'>
        <div className='row p-2'>
          <div className='col-6 p-5'>
            <h1 className='fs-2 mb-5'>Trust with confidence</h1>

            <h2 className='fs-4 text-muted'>Customer-first always</h2>
            <p className='text-muted fs-5'>
              That's why 1.6+ crore customers trust Zerodha with ~ ₹6 lakh crores of equity investments, making us India’s largest broker; contributing to 15% of daily retail exchange volumes in India.
            </p>
            <h2 className='fs-4 text-muted mt-4 mb-2'>No spam or gimmicks</h2>
            <p className='text-muted fs-5'>
              No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like. Our philosophies.
            </p>
            <h2 className='fs-4 text-muted mt-4 mb-2'>The Zerodha universe</h2>
            <p className='text-muted fs-5'>
              Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.
            </p>
            <h2 className='fs-4 text-muted mt-4 mb-2'>Do better with money</h2>
            <p className='text-muted fs-5'>
              With initiatives like Nudge and Kill Switch, we don't just facilitate transactions, but actively help you do better with your money.
            </p>
          </div>
          <div className='col-6'>
            <img src='media/images/ecosystem.png' style={{width:'100%'}}/>
              <div className='text-center p-5'>
                <a href=''className='mx-5'  style={{textDecoration:"none"}}>Explore our products <i class="fa-solid fa-arrow-right"></i></a>
                <a href='' style={{textDecoration:"none"}}>Try Kite demo <i class="fa-solid fa-arrow-right"></i></a>
              </div>
          </div>
          {/* <div className='col-12'> */}
            <img src="media/images/pressLogos.png" style={{width:"60%" , margin:"0 auto"}} />
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}

export default Stats
