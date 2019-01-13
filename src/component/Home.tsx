import React from 'react';
import { styles } from './Style';
import Body from './Body';

interface IHomeProps {
}

interface IHomeStates {
}

function getHomeStyle() {
    return {
        minHeight: "-webkit-fill-available",
    }
}

export class Home extends React.Component<IHomeProps, IHomeStates> {

    constructor(props: any) {
        super(props)
    }

    render() {
        return (

            // Entry point of APP
            <React.Fragment>
                <div className="layout" style={getHomeStyle()}>
                    <div className="flex layout-column" >
                        <div className="layout-row layout-align-start-center" style={styles.appBar}>
                            <span style={styles.appBarHead} >{`Hello Joanne!`}</span>
                        </div>
                        <Body/>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default Home;