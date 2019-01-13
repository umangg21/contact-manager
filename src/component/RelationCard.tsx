import React from 'react';
import { Card, CardActionArea } from '@material-ui/core';
import { RelationView } from '../contract/relation';
import { styles } from './Style';

interface IRelationCardProps {
    relation: RelationView;
    onSelectCard: Function;
}

interface IRelationCardStates {
    isSelected: boolean;
}


export class RelationCard extends React.Component<IRelationCardProps, IRelationCardStates> {

    constructor(props: any) {
        super(props)

        this.state = { isSelected: false }

    }

    selectCard = () => {
        this.props.onSelectCard(this.props.relation.index)
    }

    render() {

        let relationCardFrameClass = this.props.relation.isSelected ? styles.relationCardSelectedFrame : styles.relationCardFrame

        let relationCardSideNavClass = this.props.relation.isSelected ? styles.relationCardSideNavSelected : styles.relationCardSideNav

        let relationCardSideBodyClass = this.props.relation.isSelected ? styles.relationCardSideBodySelected : {}

        return (
            <React.Fragment>
                <Card style={styles.contactCardOuterFrame}>
                    <CardActionArea onClick={this.selectCard}>
                        <div className="layout-row" style={relationCardFrameClass}>
                            <div className="flex-5" style={relationCardSideNavClass}>

                            </div>
                            <div className="flex-95 layout-row layout-align-center-center" style={relationCardSideBodyClass}>
                                <span>{this.props.relation.relationName}</span>
                            </div>

                        </div>

                    </CardActionArea>

                </Card>
            </React.Fragment>

        )
    }
}

export default RelationCard;