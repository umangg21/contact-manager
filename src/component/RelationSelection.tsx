import React from 'react';
import { Card } from '@material-ui/core';
import { styles } from './Style';
import { contact } from '../contract/contact';
import AgeIcon from '../images/AgeIcon.jpg'
import LocationIcon from '../images/LocationIcon.jpg'
import { RelationView, Relation } from '../contract/relation';
import RelationCard from './RelationCard';

interface IRelationSelectionProps {
    selectedContact?: contact;
    onRelationSelection: Function;
}

interface IRelationSelectionStates {
    relations: RelationView[];
}


export class RelationSelection extends React.Component<IRelationSelectionProps, IRelationSelectionStates> {

    constructor(props: any) {
        super(props)

        let relations = this.generateRelations()
        this.state = { relations: relations }
    }

    getRelationView = () => {
        return this.state.relations.map(relation => (
            <RelationCard
                key={relation.index}
                relation={relation}
                onSelectCard={this.onSelectRelation}
            />
        ))
    }

    onSelectRelation = (relationInputIndex: number) => {
        let relationsNew = this.state.relations

        relationsNew.forEach(relation => {
            if (relation.index == relationInputIndex) {
                relation.isSelected = true
            } else {
                relation.isSelected = false
            }
        })
        
        this.props.onRelationSelection(relationInputIndex)
        this.setState({ relations: relationsNew })
    }

    generateRelations: () => RelationView[] = function () {
        var relationList: RelationView[] = []
        Relation.forEach((relation, index) => {
            if (relation) {
                relationList.push(
                    {
                        isSelected: false,
                        relationName: relation,
                        index: index,
                    }
                )
            }
        });
        return relationList;
    }

    render() {

        let relationView = this.getRelationView()

        if (this.props.selectedContact) {

            let contactName = `${this.props.selectedContact.firstName} ${this.props.selectedContact.lastName}`
            return (
                <React.Fragment>

                    <Card className="layout-column" style={styles.relationContactCard}>
                        <div className="flex-50 layout-row layout-align-space-around-center" >
                            <span style={styles.relationContactCardName}>{`Who is '${contactName}' to you?`}</span>
                        </div>
                        <div className="flex-50 layout-row layout-align-space-around-center" style={styles.relationContactCardInfo}>
                            <div className="layout-row layout-align-center-center">
                                <img src={AgeIcon} />
                                <span>{this.props.selectedContact.ageRange}</span>
                            </div>
                            <div className="layout-row layout-align-center-center">
                                <img src={LocationIcon} />
                                <span>{this.props.selectedContact.location}</span>
                            </div>
                        </div>

                    </Card>

                    <div style={styles.sideNavBodyContent}>
                        <span>
                            {"Select One of them to help us identify the correct family Member."}
                        </span>
                    </div>

                    {relationView}
                </React.Fragment>
            )
        }
        else {
            return (
                <React.Fragment></React.Fragment>
            )
        }
    }
}

export default RelationSelection;