import React from 'react';
import { Card, CardActionArea } from '@material-ui/core';
import { contact } from '../contract/contact';
import { styles } from './Style';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import { SideNav } from './SideNav';

interface IFamilyCardProps {
    contacts: contact[];
    type: number;   // 0 = family , 1 = Unidentified
    assignRelation: Function;
}

interface IFamilyCardStates {
    openSideNave: boolean;
}

const familyCardHead = ["Family Members", "Unidentified"]
const familyCardHeadStyle = [styles.familyCardHeadMain, styles.UndefinedCardHeadMain]
const familyCardBodyContent = ["Your family members are listed here.", "Choose Your family mambers and their relationship to you."]
const familyActionContent = ["Check your friends", "Choose from the list"]
const familyActionContentStyle = [styles.familyCardAction, styles.UndefinedCardAction]

export class FamilyCard extends React.Component<IFamilyCardProps, IFamilyCardStates> {

    constructor(props: any) {
        super(props)
        this.state = { openSideNave: false }

    }

    onFamilyCardClick = () => {
        this.setState({ openSideNave: true })
    }

    closeSideNave = () => {
        this.setState({ openSideNave: false })
    }

    assignRelation =(selectedContact: contact, selectedRelationIndex: number) =>{
        this.props.assignRelation(selectedContact, selectedRelationIndex)
        this.closeSideNave()
    }

    render() {

        let contacts;

        if (this.props.type) {
            contacts = this.props.contacts.filter(contact => contact.relation == 0)
        } else {
            contacts = this.props.contacts.filter(contact => contact.relation != 0)
        }

        let contactCount = contacts.length

        let sideNave;

        if (this.state.openSideNave) {
            sideNave = (
                < SideNav
                    open={this.state.openSideNave}
                    onClose={this.closeSideNave}
                    contacts={contacts}
                    type={this.props.type} // 0 = family , 1 = Unidentified
                    assignRelation={this.assignRelation}
                />
            )
        }

        return (
            <React.Fragment>

                <Card>
                    <CardActionArea onClick={this.onFamilyCardClick}>
                        <div className="layout-row" style={styles.familyCardFrame}>
                            <div
                                style={familyCardHeadStyle[this.props.type]}
                                className="flex-30 layout-column layout-align-center">
                                <span style={styles.familyCardHead}>{familyCardHead[this.props.type]}</span>
                                <span style={styles.familyCardHeadCount}>{contactCount}</span>
                            </div>
                            <div className="flex-70 layout-column">
                                <div style={styles.familyCardBodyContent} className="layout layout-align-space-around-center flex-50">
                                    <span>{familyCardBodyContent[this.props.type]}</span>
                                </div>
                                <div style={familyActionContentStyle[this.props.type]} className="layout layout-align-center-center flex-50">
                                    <span style={styles.familyActionMain} className="layout-align-end-center">{familyActionContent[this.props.type]}</span>
                                    <ArrowForwardIos style={styles.familyActionIcon} />
                                </div>
                            </div>
                        </div>

                    </CardActionArea>
                </Card>

                {this.state.openSideNave &&
                    sideNave}

            </React.Fragment>
        )
    }
}

export default FamilyCard;