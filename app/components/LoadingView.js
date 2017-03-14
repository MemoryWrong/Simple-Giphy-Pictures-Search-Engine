import React from 'react';

class LoadingView extends React.Component {

    render() {
        return (
            <div className="empty-view">
                <div className="loading-text">
                    Loading...
                </div>
                <div className="loading-icon"></div>
            </div>
        )
    }
}
export default LoadingView;