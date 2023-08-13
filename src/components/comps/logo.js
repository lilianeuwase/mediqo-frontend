import React from 'react';
import {
    MDBIcon
}
    from 'mdb-react-ui-kit';

function Logo() {
    return (
        <div className='align-items-center '>
            <MDBIcon fas icon="fa-duotone fa-capsules" style={{ color: '#01AB87ff' }} size='2x'/>
            <span className=" h2 fw-bold mb-0 " style={{ color: '#01AB87ff' }}>Mediqqo</span>
        </div>
    );
}

export default Logo;