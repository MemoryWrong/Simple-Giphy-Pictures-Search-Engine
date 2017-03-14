import React from 'react';

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            listMode: true,
            currentImage: {}
        }
    }

    componentDidMount() {
    }

    clickImage(row) {
        console.log('image is been clicked...')
        if (this.state.listMode == true) {
            this.setState({
                listMode: false,
                currentImage: row,
            })
        } else {
            this.setState({
                listMode: true,
                currentImage: {},
            })
        }
    }

    renderFullImage() {
        console.log(this.state.currentImage)
        var row = this.state.currentImage;
        return (
            <div className="single-image-view">
                <div className="single-image-text">Click image again to go back to the image results</div>
                <img onClick={this.clickImage.bind(this, row)} className="image-full"
                     src={row.images.downsized.url}></img>
            </div>
        )
    }

    renderRow(row) {
        return (
            <div className="image-view">
                <img onClick={this.clickImage.bind(this, row)} className="image-content"
                     src={row.images.downsized.url}></img>
            </div>
        )
    }

    renderList(data) {
        // console.log(data)
        if (data == [] || data.length == 0) {

            return;
        } else {

            var array = [];
            for (var i = 0; i < data.length; i++) {
                array.push(
                    <div key={i}>
                        {this.renderRow(data[i])}
                    </div>
                )
            }
            return (
                <div className="results-area">
                    {array}
                </div>

            );
        }

    }

    render() {
        return (
            <div>
                {this.state.listMode && this.renderList(this.props.data)}
                {
                    !this.state.listMode &&
                    this.renderFullImage(this.state.currentImage)
                }
            </div>
        )
    }
}
export default SearchResults;