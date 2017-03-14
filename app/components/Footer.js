import React from 'react';

class Footer extends React.Component{
    constructor(props){
        super(props)
    }
    search(){
        console.log('searching....')
    }
    render(){
        return(
            <div className="footer">
                <div className="footer-text">This is small demo is created by Carl Lee @2017</div>
            </div>
        )
    }
}
export default Footer;