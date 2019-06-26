import React, { PureComponent } from 'react'

class TrueSticky extends PureComponent {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

TrueSticky.defaultProps = {
    isSticky: true
}

export default TrueSticky