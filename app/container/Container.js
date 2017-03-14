import React from 'react';
import SearchResults from '../components/SearchResults';
import Footer from '../components/Footer';
import Http from '../service/http';
import EmptyView from '../components/EmptyView';
import LoadingView from '../components/LoadingView';
import Pager from '../components/Pager';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            empty: false,
            // placeholder:"input some information you want to search....",
            queryPhrase: '',
            loaded: true,
            currentPage: 0,
            hasData: false,
            firstLoad: true
        }
    }

    search(queryPhrase, page) {
        console.log(queryPhrase)
        history.pushState(null, null, `#${queryPhrase}`);
        /**
         * init and fetch data, use http module....
         * */
        this.setState({
            loaded: false,
            currentPage:page==0? 1:page
        }, () => {
            this.fetch(queryPhrase, page)
        })

    }

    fetch(queryPhrase, page) {
        /**25 items in one page*/
        page = page >= 1 ? page - 1 : 0;
        Http.getListData(queryPhrase, page * 25).then((json) => {
            console.log(json)
            if (json.data && json.data !== undefined && json.data.length >= 1) {
                console.log('there is some data')
                this.setState({
                    data: json.data,
                    totalCount: json.pagination.total_count,
                    empty: false,
                    loaded: true,
                    hasData: true,
                    firstLoad: false
                });
            } else {
                console.log('there is no data');
                console.log(json);
                this.setState({
                    empty: true,
                    loaded: true,
                    firstLoad: false
                });
            }
        })
    }

    componentDidMount() {

    }

    renderResults() {
        console.log('haha' + this.state.totalCount)
        if (this.state.empty) {
            return (
                <EmptyView/>
            )
        } else {
            return (
                <div>
                    <Pager totalCount={this.state.totalCount} data={this.state.data} search={(page) => {
                        this.search(this.state.queryPhrase, page)
                    }}
                           setPage={(page) => {
                               this.setPage(page)
                           }}
                    />
                    <div className="page-number">current page {this.state.currentPage=this.state.currentPage==0?1:this.state.currentPage}</div>
                    <SearchResults data={this.state.data}/>
                </div>
            )
        }
    }

    setPage(page) {
        this.setState({
            currentPage: page
        })
    }

    enter_search(event) {
        // console.log(event.keyCode)
        // console.log(this.state.queryPhrase)
        if (event.keyCode == 13) {
            this.search(this.state.queryPhrase, 0);
        }
    }

    onChange(event) {
        // console.log(event.target.value)

        this.setState({
            queryPhrase: event.target.value,
        })
    }

    render() {
        return (
            <div>
                <div className="main-title">Monki Search</div>
                <div className="search-bar">
                    <div className="search-area">
                        <input className="search-input"
                               onKeyUp={this.enter_search.bind(this)}
                               type="text"
                               placeholder="input some information you want to search...."
                               onChange={this.onChange.bind(this)}
                        />
                        <button className="search-btn"
                                onClick={this.search.bind(this, this.state.queryPhrase, 0)}></button>
                    </div>
                </div>

                {
                    !this.state.loaded &&
                    <LoadingView/>
                }
                {/*
                 this.state.loaded &&
                 this.renderPager()
                 */}
                {
                    this.state.loaded &&
                    this.renderResults()
                }
                <Footer/>
            </div>
        )
    }
}
export default Container;