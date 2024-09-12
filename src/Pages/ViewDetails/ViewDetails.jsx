import React from 'react';
import {AnalyticsReport} from '../../components/AnalyticsReport';
import "./ViewDetail.css"
import { useNavigate } from 'react-router-dom';
export const ViewDetails = () => {
    const navigate=useNavigate()
    const handalBack=()=>{
        navigate('/Dashboard')
    }
  return (
    <div className="cardViewDetails">
      <div className="card1234ViewDetails">
        <div className="leftViewDetails">
          <div className="heads1ViewDetails">
            <h1>Sales and Revenue</h1>
          </div>
          <div className="sales-dashboardViewDetails">
            <div className="infoViewDetails">
              <div className="card-rowViewDetails">
                <p>Overall Sales: <span className="abc123ViewDetails">12 Millions</span></p>
              </div>
              <div className="card-rowViewDetails">
                <p>Overall Earnings: <span className="abc123ViewDetails">78 Millions</span></p>
              </div>
              <div className="card-rowViewDetails">
                <p>Overall Revenue: <span className="abc123ViewDetails">60 Millions</span></p>
              </div>
              <div className="card-rowViewDetails">
                <p>New Customers: <span className="abc123ViewDetails">23k</span></p>
              </div>
            </div>
          </div>
          <button onClick={handalBack}> Go Back</button>
        </div>
        <div className="rightViewDetails">
          <AnalyticsReport />
        </div>
       
      </div>
      
    </div>
    
  );
};
