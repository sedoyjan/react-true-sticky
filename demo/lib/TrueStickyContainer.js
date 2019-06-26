import React, { PureComponent, Fragment } from 'react'

const contentStyles = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    overflow: 'auto',
}

const wrapperStyles = {
    position: 'relative',
    overflow: 'hidden',
}

const bucketStyles = {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    height: 0,
    overflow: 'hidden',
}

hideScrollbar()

class TrueStickyContainer extends PureComponent {

    stickyRefMap = {}
    stickyCloneRefMap = {}
    refMap = {}
    isSticky = false

    componentDidMount() {
        window.addEventListener('resize', this.onSmthChanged)
    }


    componentWillUnmount() {
        window.removeEventListener('resize', this.onSmthChanged)
        if (this.refMap['content']) {
            this.refMap['content'].removeEventListener('scroll', this.onSmthChanged)
        }
    }


    setRef = (id, clb) => (r) => {
        if (r) {
            this.refMap[id] = r
            if (clb) {
                clb(r)
            }
        }
    }

    setListeners = (content) => {
        content.addEventListener('scroll', this.onSmthChanged)
    }

    onSmthChanged = () => {

        const content = this.refMap['content']
        const bucket = this.refMap['bucket']

        for (const key in this.stickyRefMap) {
            const sticky = this.stickyRefMap[key]
            const stickyClone = this.stickyCloneRefMap[key]
            const stickyTop = stickyClone.offsetHeight + sticky.offsetTop
            let top = content.scrollTop - sticky.offsetTop
            if (top > stickyClone.offsetHeight) {
                top = stickyClone.offsetHeight
            }
            if (top < 0) {
                top = 0
            }

            if (top >= 0) {
                sticky.style.height = `${stickyClone.offsetHeight - (top / 2)}px`
            }


            if (top === stickyClone.offsetHeight && !this.isSticky) {
                this.isSticky = true
            }
            if (top === 0 && this.isSticky) {
                this.isSticky = false
            }

            content.style.top = `${top}px`
            bucket.style.height = `${top}px`
        }
    }

    renderItems = () => {
        return React.Children.map(this.props.children, (item) => {
            if (item.props.isSticky) {
                return (
                    <div ref={r => {
                        if (r) {
                            this.stickyRefMap[item.props.id] = r
                        }
                    }}>
                        {item}
                    </div>
                )
            } else {
                return item
            }
        })
    }

    renderSticky = () => {
        const sticky = []
        React.Children.map(this.props.children, (item) => {
            if (item.props.isSticky) {
                sticky.push(
                    <div
                        key={`Clone${item.props.id}`}
                        ref={r => {
                            if (r) {
                                this.stickyCloneRefMap[item.props.id] = r
                            }
                        }}
                    >
                        {item}
                    </div>
                )
            }
        })
        return sticky
    }

    render() {
        const className = this.props.className ? this.props.className : ''

        return (
            <div className={`${className}`} style={wrapperStyles} ref={this.setRef('wrapper')}>
                <div style={bucketStyles} ref={this.setRef('bucket')}>
                    {this.renderSticky()}
                </div>
                <div style={contentStyles} className={'no-scrollbar'} ref={this.setRef('content', this.setListeners)}>
                    {this.renderItems()}
                </div>
            </div>
        )
    }
}

export default TrueStickyContainer

function hideScrollbar() {
    var css = '.no-scrollbar::-webkit-scrollbar {width: 0;}.no-scrollbar {-ms-overflow-style: none;}.no-scrollbar {overflow: -moz-scrollbars-none;}'
    var style = document.createElement('style')

    if (style.styleSheet) {
        style.styleSheet.cssText = css
    } else {
        style.appendChild(document.createTextNode(css))
    }

    document.getElementsByTagName('head')[0].appendChild(style)
}