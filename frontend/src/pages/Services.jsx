import React from 'react'
import Banner from '../components/Banner'

const Services = () => {
  return (
    <>
      <Banner title='Services' />

      <div className="section grey">
        <div className="panel panel-white title">Included</div>
        <div className="grid-2">

          <div className="card card-full">
            <div className="card-img-sm wifi"></div>
            <div className="card-body-sm">
              <div className="text-md center">Wifi</div>
            </div>
          </div>

          <div className="card card-full">
            <div className="card-img-sm tv"></div>
            <div className="card-body-sm">
              <div className="text-md center">TV</div>
            </div>
          </div>

          <div className="card card-full">
            <div className="card-img-sm laundry"></div>
            <div className="card-body-sm">
              <div className="text-md center">Laundry</div>
            </div>
          </div>

          <div className="card card-full">
            <div className="card-img-sm luggage"></div>
            <div className="card-body-sm">
              <div className="text-md center">Luggage deposit</div>
            </div>
          </div>

          <div className="card card-full">
            <div className="card-img-sm parking"></div>
            <div className="card-body-sm">
              <div className="text-md center">Parking</div>
            </div>
          </div>

        </div>


        <div className="section grey">
          <div className="panel panel-white title">Additional</div>
          <div className="grid-2">

            <div className="card card-full">
              <div className="card-img-sm breakfast"></div>
              <div className="card-body-sm">
                <div className="text-md center">Dining</div>
              </div>
            </div>

            <div className="card card-full">
              <div className="card-img-sm breakfast yoga"></div>
              <div className="card-body-sm">
                <div className="text-md center">Recreational activities</div>
              </div>
            </div>

          </div>
        </div>


      </div>
    </>
  )
}

export default Services