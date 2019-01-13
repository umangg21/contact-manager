import React from 'react';
import { contact } from '../contract/contact';
import { Card, CardActionArea } from '@material-ui/core';
import { styles } from './Style';

import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Relation } from '../contract/relation';

interface IContactCardProps {
    contactInfo: contact;
    onSelectContact: Function;
    onSelectRelation: Function;
}

interface IContactCardStates {
}

const contactCardActionIconClass = `
    font-size= "48px"
`

export class ContactCard extends React.Component<IContactCardProps, IContactCardStates> {

    constructor(props: any) {
        super(props)
    }

    selectCard = () => {
        if (this.props.contactInfo.relation == 0) {
            if (!this.props.contactInfo.selected) {
                this.props.onSelectContact(this.props.contactInfo)
            } else {
                this.props.onSelectRelation(this.props.contactInfo)
            }
        }
    }

    render() {

        var contactLeftAction;

        if (this.props.contactInfo.relation == 0) {
            // Unidentified Relation
            let styleClass = this.props.contactInfo.selected ? styles.contactCardUndefinedActionSelected : styles.contactCardUndefinedAction
            contactLeftAction = (
                <div style={styleClass} className="flex-30 layout-column layout-align-center-center">
                    <span style={styles.ArrowForwardIcon}>
                        <ArrowForwardIcon className={contactCardActionIconClass}
                            fontSize={`inherit`} />
                    </span>
                </div>
            )
        }
        else {
            // Family Relation
            let relation = Relation[this.props.contactInfo.relation]
            contactLeftAction = (
                <div style={styles.contactCardFamilyAction} className="flex-30 layout-column layout-align-center-center">
                    <span style={styles.familyCardHead}>{relation}</span>
                </div>
            )
        }

        var contactCardFrameClass = this.props.contactInfo.selected ? styles.contactCardSelectedFrame : styles.contactCardFrame;

        return (

            <React.Fragment>
                <Card style={styles.contactCardOuterFrame}>
                    <CardActionArea onClick={this.selectCard}>
                        <div className="layout-row" style={contactCardFrameClass}>
                            <div className="flex-70 layout-column">
                                <div className="flex-50 layout-row layout-align-start-center" style={styles.contactCardBody}>
                                    <span style={styles.contactInfoName}>
                                        {this.props.contactInfo.firstName + ' ' + this.props.contactInfo.lastName}
                                    </span>
                                </div>
                                <div className="flex-50 layout-row" style={styles.contactCardBody}>
                                    <div className="flex-50 layout-row layout-align-center-center" >
                                        <span style={styles.contactIcon}><EmailIcon /></span>
                                        <span style={styles.contactInfo}>{this.props.contactInfo.email}</span>
                                    </div>
                                    <div className="flex-50 layout-row layout-align-center-center" >
                                        <span style={styles.contactIcon}><PhoneIcon /></span>
                                        <span style={styles.contactInfo}>{this.props.contactInfo.phone}</span>
                                    </div>
                                </div>

                            </div>
                            {contactLeftAction}

                        </div>
                    </CardActionArea>
                </Card>
            </React.Fragment >
        )
    }
}

export default ContactCard;