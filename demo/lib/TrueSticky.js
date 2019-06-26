import React, { PureComponent, Fragment } from 'react'

class TrueSticky extends PureComponent {

    render() {
        return (
            <Fragment>
                {this.props.children}
            </Fragment>
        )
    }
}

TrueSticky.defaultProps = {
    isSticky: true
}

export default TrueSticky