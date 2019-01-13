import React from 'react';
import { Button, Card, Snackbar } from '@material-ui/core';
import { styles } from './Style';
import Fab from '@material-ui/core/Fab';
import GoogleIcon from '../images/google.jpg';
import FacebookIcon from '../images/facebook.jpg';
import ContactIcon from '../images/contact.jpg';
import ViewPhoneBookIcon from '../images/phonebook.jpg';
import CircularProgress from '@material-ui/core/CircularProgress';
import { contact } from '../contract/contact';
import FamilyCard from './FamilyCard';
import Phonebook from './PhoneBook';
import Stepper from 'react-stepper-horizontal';

interface IBodyProps {
}

interface IBodyStates {
    activeCard: number;  // 0 = SourceCard(Google, Faceboook),  1 = BucketCard 
    inProgress: boolean;
    contactList: contact[];
    showSuccessMesage: boolean;
    showPhoneBook: boolean;
}

const contactSourceList = ["Google", "Facebook", "Contact File"]
const contactSourceListIcon = [GoogleIcon, FacebookIcon, ContactIcon]
const cardHolderMessage = ["Import Your Contacts", "Manage Family"]
const cardHeaderMessage = [`Select a platform to import contacts`, `Choose your family members from the list of contacts you have updated`, 'Fetching Contacts...']

export class Body extends React.Component<IBodyProps, IBodyStates> {

    constructor(props: any) {
        super(props)

        this.state = {
            activeCard: 0,
            inProgress: false,
            contactList: [],
            showSuccessMesage: false,
            showPhoneBook: false
        }
    }

    onSetState = () => {
        this.setState({ activeCard: 1 - this.state.activeCard })
    }

    getContacts = () => {
        this.setState({ inProgress: true })

        let contacts = require('../contract/contactData.json')
        this.setState({ contactList: contacts })

        // Just to show the spinner, can remove once actual call to api is implemented
        setTimeout(() => {
            this.setState({ inProgress: false, activeCard: 1 })
        }, 500)
    }

    getContactSourceList = () => {
        if (this.state.inProgress) {
            return (
                <div className="layout-column layout-align-center-center">
                    <CircularProgress style={styles.inProgress} />
                    <span style={styles.contactLabel}>{`Please wait while we fetch your contacts...`}</span>
                </div>
            )
        }
        return contactSourceList.map((contactLabel, index) => (
            <div className="layout-column layout-align-center-center" key={index}>
                <Fab style={styles.selectContactButton} aria-label="Add"
                    onClick={this.getContacts}>
                    <img src={contactSourceListIcon[index]} />
                </Fab>
                <span style={styles.contactLabel}>{contactLabel}</span>
            </div>
        ))
    }

    getBucketList = () => {
        return [0, 1].map((familytype) => (
            <FamilyCard
                key={familytype}
                contacts={this.state.contactList}
                type={familytype}
                assignRelation={this.assignRelation}
            />))
    }

    assignRelation = (selectedContact: contact, selectedRelationIndex: number) => {
        let contactList = this.state.contactList
        let contactIndex = contactList.findIndex(contact => contact.id == selectedContact.id)
        if (contactIndex >= 0) {
            contactList[contactIndex].relation = selectedRelationIndex
        }
        this.setState({ contactList: contactList })
        this.showSuccessMesage()
    }

    showSuccessMesage = () => {
        this.setState({ showSuccessMesage: true })
    }

    onCloseSuccesMessage = () => {
        this.setState({ showSuccessMesage: false })
    }

    onShowPhoneBook = () => {
        this.setState({ showPhoneBook: true })
    }

    onClosePhoneBook = () => {
        this.setState({ showPhoneBook: false })
    }

    render() {

        var visibleBody;
        if (this.state.showPhoneBook) {

            // PhoneBook

            visibleBody = (
                <div className="flex layout-row">
                    <div className="flex-15">
                    </div>
                    <div className="flex-70 layout-column">
                        <Phonebook
                            contacts={this.state.contactList}
                            onClosePhoneBook={this.onClosePhoneBook}
                        />
                    </div>
                    <div className="flex-15">
                    </div>
                </div >
            )
        }
        else {
            // ContactSource and BucketList

            const cardContent = [this.getContactSourceList, this.getBucketList]
            const cardContentClass = ["layout-row ", "layout-column "]
            const cardHeadMessage = this.state.inProgress ? cardHeaderMessage[2] : cardHeaderMessage[this.state.activeCard]

            visibleBody = (
                <div className="flex layout-row" style={styles.contactSelectionBody} >
                    <div className="flex-25">

                    </div>
                    <div className="flex-50 layout-column">

                        <div className="flex-15 layout-row layout-align-center-end" >
                            {/* <Button type="primary" onClick={this.onShowPhoneBook}>{"Change Card"}</Button> */}
                            <Stepper 
                            steps={ [{title: ''}, {title: ''}] } 
                            activeStep={ this.state.activeCard }
                            circleFontColor={"transparent"}
                            activeColor={"white"}
                            defaultColor={"white"}
                            completeColor={"#33475B"}
                            activeBorderColor={"#33475B"}
                            activeBorderStyle={"solid"}
                            activeBorderWidth={2}
                            completeBorderColor={"#33475B"}
                            completeBorderStyle={"solid"}
                            completeBorderWidth={2}
                            defaultBorderColor={"white"}
                            defaultBorderStyle={"solid"}
                            defaultBorderWidth={2}
                            completeBarColor={"#33475B"}
                            defaultBarColor={"white"}
                            lineMarginOffset={3}
                         />
                        </div>

                        <div className="flex-85 layout-row layout-align-center-start">
                            <div style={styles.cardHolder}>
                                <div className="layout-row layout-align-space-between-center">
                                    <span style={styles.cardHolderFont}>{cardHolderMessage[this.state.activeCard]}</span>
                                    <span style={styles.cardHolderFont}>{`Help?`}</span>
                                </div>

                                <Card className="layout-column" style={styles.cardMain}>
                                    <div className="flex-15 layout-row layout-align-center-center" style={styles.cardHeader}>
                                        <span style={styles.cardHeaderFont}>{cardHeadMessage}</span>
                                    </div>

                                    <div className={cardContentClass[this.state.activeCard] + "flex-85 layout-align-space-around-center"} style={styles.cardBody}>
                                        {cardContent[this.state.activeCard]()}
                                    </div>
                                </Card>

                            </div>
                        </div>

                    </div>
                    <div className="flex-25 layout-row layout-align-center-center">
                        {this.state.activeCard == 1 &&
                            <div className="layout-column layout-align-center-center">
                                <Fab style={styles.viewPhoneBookListButton} aria-label="View PhoneBook"
                                    onClick={this.onShowPhoneBook}>
                                    <img src={ViewPhoneBookIcon}/>
                                </Fab>
                                <span style={styles.viewPhoneBookMessage}>
                                    {`View PhoneBook`}
                                </span>
                            </div>
                        }
                    </div>
                </div>
            )
        }

        var succesMessage = (
            <Snackbar
                open={this.state.showSuccessMesage}
                autoHideDuration={4000}
                onClose={this.onCloseSuccesMessage}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id" style={styles.familyCardHead}>{`Wohoo! A new family member added.`}</span>}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
            </Snackbar>
        )

        return (
            <React.Fragment>
                {visibleBody}
                {succesMessage}
            </React.Fragment >
        )
    }
}

export default Body;