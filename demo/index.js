import React, { PureComponent } from "react"
import ReactDOM from "react-dom"
import styles from './index.scss'
import {
    TrueSticky,
    TrueStickyContainer
} from './lib'

class Demo extends PureComponent {

    renderList = () => {

        const liArr = []
        for (let index = 0; index < 10; index++) {
            liArr.push(
                // <li style={{ backgroundColor: `rgba(255,0,0,${0.1 * (index + 1)})` }} key={`Item ${index}`}>{`Item ${index}`}</li>
                <li key={`Item ${index}`}>{`Item ${index}`}</li>
            )
        }

        return (
            <ul>
                {liArr}
            </ul>
        )
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <h1 className={styles.title}>react-true-sticky</h1>
                <TrueStickyContainer className={styles.demo}>
                    <div className={styles.topSpacer}>
                        <h1>Spacer</h1>
                    </div>
                    <TrueSticky id={'header'}>
                        <li style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                            Sticky
                        </li>
                    </TrueSticky>
                    {this.renderList()}
                </TrueStickyContainer>
            </div>
        )
    }
}

ReactDOM.render(<Demo />, document.getElementById("app"))