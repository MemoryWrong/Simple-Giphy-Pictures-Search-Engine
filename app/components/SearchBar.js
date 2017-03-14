import React from 'react';

class SearchBar extends React.Component{
    constructor(){
        super(props)
    }
    search(){
        console.log('searching....')
    }
    render(){
        return(
            <div>
                <div>input some text here....</div>
                <div onClick={this.search.bind(this)}>Search12</div>
            </div>
        )
    }
}
export default SearchBar;