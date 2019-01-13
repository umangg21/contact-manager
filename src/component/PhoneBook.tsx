import React from 'react';
import { Chip, TextField } from '@material-ui/core';
import { contact } from '../contract/contact';
import { styles } from './Style';
import { Relation } from '../contract/relation';

interface IPhonebookProps {
    contacts: contact[];
    onClosePhoneBook: Function;

}

interface IPhonebookStates {
    contacts: contact[];
    search: string;
}


export class Phonebook extends React.Component<IPhonebookProps, IPhonebookStates> {

    constructor(props: any) {
        super(props)
        this.state = { contacts: this.props.contacts, search: "" }

    }

    onClosePhoneBook = () => {
        this.props.onClosePhoneBook()
    }

    getFamilyList = () => {
        return this.state.contacts.filter(contact => contact.relation != 0).map((contact, index) => (
            <PhoneBookItem key={index}
                contact={contact}
                look={index % 2}
            />
        ))
    }

    getIdentifiedList = () => {
        return this.state.contacts.filter(contact => contact.relation == 0).map((contact, index) => (
            <PhoneBookItem key={index}
                contact={contact}
                look={index % 2}
            />
        ))
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
        let familyList = this.getFamilyList()
        let unIdentifiedList = this.getIdentifiedList()

        return (
            <React.Fragment>
                <div className="layout-column">
                    <div style={styles.PhonebookHeader}>
                        <span >
                            {`Contacts`}
                        </span>
                    </div>
                    <div className="layout-column layout-align-center-stretch">
                        <TextField
                            id="outlined-search"
                            label="Search Contact"
                            value={this.state.search}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div className="layout-row layout-align-end-center"
                        style={styles.ManageListMessage}
                        onClick={this.onClosePhoneBook}>
                        <span style={{ cursor: `pointer` }}>
                            {`Manage List`}
                        </span>
                    </div>

                    <div className="layout-column">
                        <div style={styles.phonBookListHead} className="layout-row layout-align-start-center">
                            <span>{`Family Member (${familyList.length})`}</span>
                        </div>
                        {familyList}
                        <div style={styles.phonBookListHead} className="layout-row layout-align-start-center">
                            <span>{`Unidentified (${unIdentifiedList.length})`}</span>
                        </div>
                        {unIdentifiedList}
                    </div>

                </div>

            </React.Fragment>
        )
    }
}

export default Phonebook;



interface IPhoneBookItemProps {
    contact: contact;
    look: number;
}

interface IPhoneBookItemStates {
}

export class PhoneBookItem extends React.Component<IPhoneBookItemProps, IPhoneBookItemStates> {

    constructor(props: any) {
        super(props)

    }

    render() {
        let phoneBookItemStyle = this.props.look ? styles.phoneBookItemWhite : styles.phoneBookItemGray
        return (
            <React.Fragment>
                <div className="layout-row layout-align-center-center" style={phoneBookItemStyle}>
                    <div className="flex-40 layout-row">
                        <span style={styles.phoneBookInfoName}>{this.props.contact.firstName + " " + this.props.contact.lastName}</span>
                        {this.props.contact.relation != 0 &&
                            <Chip label={Relation[this.props.contact.relation]} style={styles.familyChip} />
                        }

                    </div>
                    <div className="flex-40">
                        <span style={styles.phoneBookInfo}>{this.props.contact.email}</span>
                    </div>
                    <div className="flex-20">
                        <span style={styles.phoneBookInfo}>{this.props.contact.phone}</span>
                    </div>

                </div>

            </React.Fragment>
        )
    }
}
