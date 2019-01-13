import React from 'react';
import { Drawer, Card, CardActionArea, TextField } from '@material-ui/core';
import { styles } from './Style';
import { contact } from '../contract/contact';
import ContactCard from './ContactCard';
import CloseIcon from '@material-ui/icons/Close';
import RelationSelection from './RelationSelection';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';

interface ISideNavProps {
    open: boolean;
    onClose: Function;
    contacts: contact[];
    type: number; // 0 = family , 1 = Unidentified
    assignRelation: Function;
}

interface ISideNavStates {
    selectedContact?: contact;
    selectedPage: number;  // 0 showContact , 1= selectContact    
    selectedRelationIndex: number;
    search: string;
    contacts: contact[];
}


export class SideNav extends React.Component<ISideNavProps, ISideNavStates> {

    constructor(props: any) {
        super(props)
        this.state = {
            selectedContact: undefined,
            selectedPage: 0,
            selectedRelationIndex: 0,
            search: "",
            contacts: this.props.contacts
        }

    }

    close = () => {
        this.props.onClose()
    }

    getContactList = () => {
        return this.state.contacts.map(contact => (
            <ContactCard
                key={contact.id}
                contactInfo={contact}
                onSelectContact={this.selectContact}
                onSelectRelation={this.onSelectRelation}
            />
        ))
    }

    selectContact = (contactInfo: contact) => {
        let contactList = this.state.contacts
        contactList.forEach(contact =>{
            if(contact.id == contactInfo.id){
                contact.selected = true
            } else{
                contact.selected = false
            }
        })

        this.setState({contacts: contactList})
    }

    onSelectRelation = (contactInfo: contact) => {
        contactInfo.selected = false
        this.setState({ selectedContact: contactInfo, selectedPage: 1 })
    }

    selectInitialPage = () => {
        this.setState({ selectedContact: undefined, selectedPage: 0, selectedRelationIndex: 0 })
    }

    onRelationSelection = (relationIndex: number) => {
        this.setState({ selectedRelationIndex: relationIndex })
    }

    assignRelation = () => {
        this.props.assignRelation(this.state.selectedContact, this.state.selectedRelationIndex)
    }

    handleChange = (event: any) => {
        var searchParameter = event.target.value
        this.setState({ search: searchParameter })

        let contactList = this.props.contacts.filter(contact => {
            let contactName = contact.firstName + " " + contact.lastName
            console.log(contactName.toLowerCase(), searchParameter.toLowerCase())
            return (contactName.toLowerCase().includes(searchParameter.toLowerCase())
                || contact.email.toLowerCase().includes(searchParameter.toLowerCase())
                || contact.phone.toLowerCase().includes(searchParameter.toLowerCase()))
        })
        this.setState({ contacts: contactList })
    }

    render() {

        var visiblePage;

        if (this.state.selectedPage == 0) {
            // Show Family Contacts
            visiblePage = (
                <React.Fragment>
                    {/* Show headr only for unidentified contacts */}
                    {this.props.type == 1 &&
                        <div style={styles.sideNavBodyContent}>
                            <span>
                                {"Click a contact and select who is to you."}
                            </span>
                        </div>
                    }
                    {/* Show Search only for family contacts */}
                    {this.props.type == 0 &&
                        <div className="layout-column layout-align-center-stretch" style={styles.contactCardOuterFrame}>
                            <TextField
                                id="outlined-search"
                                label="Search a contact"
                                value={this.state.search}
                                onChange={this.handleChange}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>}
                    {this.getContactList()}
                </React.Fragment>
            )
        }
        else {
            visiblePage = (
                <RelationSelection
                    selectedContact={this.state.selectedContact ? this.state.selectedContact : undefined}
                    onRelationSelection={this.onRelationSelection}
                />
            )
        }

        var nevHead;
        if (this.state.selectedPage == 0) {
            nevHead = this.props.type ? `Unidentified` : `Family Members `
            nevHead += `(${this.props.contacts.length})`
        }
        else if (this.state.selectedPage == 1 && this.state.selectedContact) {
            nevHead = `${this.state.selectedContact.firstName} ${this.state.selectedContact.lastName}`
        }

        return (
            <React.Fragment>

                <Drawer
                    anchor="right"
                    open={this.props.open}
                    onClose={this.close}>

                    <div style={styles.sideNavFrame} className={"layout-column flex"}>
                        <div className="flex-10 layout-row layout-align-space-between-center" style={styles.sideNavHeader}>
                            {this.state.selectedPage == 1 &&
                                <span style={styles.closeIcon} onClick={this.selectInitialPage}>
                                    <ArrowBackIcon
                                        fontSize="inherit"
                                    />
                                </span>
                            }
                            <span>{nevHead}</span>
                            <span style={styles.closeIcon} onClick={this.close}>
                                <CloseIcon
                                    fontSize="inherit"
                                />
                            </span>
                        </div>
                        <div className="flex-90 ayout-align-space-around-center" style={styles.sideNavBody}>
                            {visiblePage}
                        </div>
                        {this.state.selectedPage == 1 && this.state.selectedRelationIndex != 0 &&
                            <div className="layout-row layout-align-center-center" style={styles.selectionButtonFrame}>
                                <Card>
                                    <CardActionArea onClick={this.assignRelation} style={styles.selelectionButton}>
                                        <span className="layout-row layout-align-center-center">{`Select`}</span>
                                    </CardActionArea>
                                </Card>
                            </div>}

                    </div>
                </Drawer>

            </React.Fragment>
        )
    }
}

export default SideNav;