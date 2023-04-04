import React from 'react';
import CardItem1 from '../../components/cards/CardItem1';
import './ncd.css';

import diabetes from '../../images/diabetes.jpeg';
import hyper from '../../images/Hyper1.png';
import derma from '../../images/Doctor1.jpeg';
import psy from '../../images/Doctor1.jpeg';
import gyn from '../../images/Doctor1.jpeg';

function OldNCD() {
  return (
    <div className='cards'>
      <p class="title">NCD TO RE-CONSULT</p>
      <div className='cards_container'>
        <div className='cards_wrapper'>
          <ul className='cards_items'>
            <CardItem1
              src={diabetes}
              text='This section is designed for already diagnosed Diabetes 1 & 2 Patients'
              label='DIABETES'
              path='/userDetails/oldconsult/olddiabetes'
            />
                 <CardItem1
              src={hyper}
              text='This section is designed for suspected Hypertension Patients'
              label='HYPERTENSION'
              path='/userDetails/oldconsult/oldhypertension'
            />
          </ul>
          <ul className='cards_items'>
            <CardItem1
              src={derma}
              text='Skin, Hair, and Nails Conditions'
              label='Dermatologist'
              path='/derma'
            />
            <CardItem1
              src={psy}
              text='Diagnosis, Treatment and Prevention of Mental, Emotional and Behavioral Disorders'
              label='Psychiatrist'
              path='/psy'
            />
            <CardItem1
              src={gyn}
              text='Conditions that Affect the Female Reproductive System'
              label='Gynecologist'
              path='/gyne'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OldNCD;
