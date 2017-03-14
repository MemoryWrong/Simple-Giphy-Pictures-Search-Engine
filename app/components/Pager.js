import React from 'react';

class Pager extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            totalCount: 0,
            maxPage:0,
            page:0,
        }
    }

    enter_search(event) {
        // console.log(event.keyCode)
        // console.log(this.state.queryPhrase)
        if (event.keyCode == 13) {
            /**
             * if press Enter
             * */
            if(isNaN(Number(this.state.page))){
                console.log('not a number')
                alert('input is not a number')
                return;
            }
            this.props.search(this.state.page)
            this.props.setPage(this.state.page)
            console.log(this.state.page);
        }
    }

    onChange(event) {
        // console.log(this.state.totalCount)
        // console.log(event.target.value)
        this.setState({
            page:event.target.value
        })

    }

    componentDidMount() {
        this.setState({
            totalCount: this.props.totalCount
        })
    }

    render() {
        if (this.props.data.length > 0) {
            return (
                // <div className="pager-wrap">
                //     <ul className="pager-list">
                //         <li>1</li>
                //         <li>2</li>
                //         <li>3</li>
                //         <li>4</li>
                //     </ul>
                // </div>
            <div>
                <div className="page-wrap">
                    <div className="flex-div"></div>
                    <div>
                        <div className="page-text">
                            Input page number between 1~{Math.ceil(this.state.totalCount/25)}
                        </div>
                        <input className="page-input"
                               onKeyUp={this.enter_search.bind(this)}
                               type="text"
                               placeholder=''
                               onChange={this.onChange.bind(this)}
                        />
                    </div>
                    <div className="flex-div"></div>
                </div>
            </div>

            )
        } else {
            return null;
        }

    }
}
export default Pager;