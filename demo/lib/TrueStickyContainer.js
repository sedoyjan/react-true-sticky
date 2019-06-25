import React, { PureComponent, Fragment } from 'react'
import styles from './styles.scss'

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
                console.log('sticky')
            }
            if (top === 0 && this.isSticky) {
                this.isSticky = false
                console.log('not sticky')
            }

            content.style.top = `${top}px`
            bucket.style.height = `${top}px`
        }
    }

    renderItems = () => {
        return React.Children.map(this.props.children, (item) => {
            if (item.type.name === 'TrueSticky') {
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
            if (item.type.name === 'TrueSticky') {
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
            <div className={`${className} ${styles.wrapper}`} ref={this.setRef('wrapper')}>
                <div className={styles.stickyBucket} ref={this.setRef('bucket')}>
                    {this.renderSticky()}
                </div>
                <div className={styles.content} ref={this.setRef('content', this.setListeners)}>
                    {this.renderItems()}
                </div>
            </div>
        )
    }
}

export default TrueStickyContainer