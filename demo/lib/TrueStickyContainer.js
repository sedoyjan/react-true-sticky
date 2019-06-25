import React, { PureComponent, Fragment } from 'react'
import styles from './styles.scss'

class TrueStickyContainer extends PureComponent {

    state = {
        isReady: false,
        isSticky: false
    }

    container = null
    sticky = null

    scrollContainer = null
    initialContainerHeight = 0
    initialStickyHeight = 0

    componentDidMount() {

    }

    componentWillUnmount() {
        this.container.removeEventListener('scroll', this.onSmthChanged)
    }

    setContainer = (ref) => {
        if (ref) {
            this.container = ref
            this.initialContainerHeight = this.container.getBoundingClientRect().height
            if (!this.state.isReady) {
                this.setListeners()
                this.setState({ isReady: true })
            }
        }
    }

    setStickyRef = (ref) => {
        if (ref) {
            this.sticky = ref
            this.initialStickyHeight = this.container.getBoundingClientRect().height
        }
    }

    setOthersRef = (ref) => {
        if (ref) {
            this.other = ref
            this.otherHeight = this.other.getBoundingClientRect().height
            console.log(this.otherHeight)
        }
    }

    setListeners = () => {
        this.container.addEventListener('scroll', this.onSmthChanged)
    }

    onSmthChanged = (e) => {
        const stickyTop = this.sticky ? this.sticky.getBoundingClientRect().top : 0
        const containerTop = this.container ? this.container.getBoundingClientRect().top : 0
        const isSticky = containerTop - stickyTop
        if (this.state.isSticky !== isSticky) {
            this.setState({ isSticky: isSticky })
        }
        if (this.other) {
            this.other.scrollTop = e.target.scrollTop
        }
    }

    renderChildren(sticky, otherItems) {
        return (
            <Fragment>
                <div ref={this.setStickyRef}>{sticky}</div>
                <div
                    ref={this.setOthersRef}
                    className={styles.scrollChildren}
                    style={{
                        overflow: 'auto',
                        height: this.initialContainerHeight - 80
                    }}
                >{otherItems}</div>
            </Fragment>
        )
    }

    render() {
        let sticky = undefined
        const otherItems = []
        React.Children.map(this.props.children, (item) => {
            if (item.type.name === 'TrueSticky') {
                let propsToPass = { ...item.props }
                propsToPass.isSticky = this.state.isSticky
                sticky = React.cloneElement(item, propsToPass)
            } else {
                otherItems.push(item)
            }
        })

        const className = this.props.className ? this.props.className : ''
        const containerStyles = {
            position: 'fixed'
        }
        return (
            <div
                style={{ position: 'relative' }}
                className={className}
                ref={this.setContainer}
            >

                <div style={{
                    position: 'fixed',
                    top: '80px',
                    left: '50%',
                    width: '768px',
                    marginLeft: '-384px',
                    zIndex: -1,
                    height: this.initialContainerHeight
                }}>
                    {this.state.isReady ? this.renderChildren(sticky, otherItems) : null}
                </div>
                <div style={{
                    width: 0,
                    height: 880,
                }}></div>
            </div >
        )
    }
}

export default TrueStickyContainer


// #fixedContainer {
//     position: fixed;
//     width: 600px;
//     height: 200px;
//     left: 50%;
//     top: 0%;
//     margin-left: -300px; /*half the width*/
//   }