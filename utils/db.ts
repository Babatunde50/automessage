import Realm from "realm";

const MessageSchema = {
    name: 'Message',
    primaryKey: 'id',
    properties: {
        id: 'int',
        messages: 'string[]',
        sendingDate: 'date',
        sendingTime: 'date',
        mobileNumbers: 'string[]',
        repeat: 'string',
        repeatUntil: 'string',
        countDown: 'bool',
        askMe: 'bool',
        notify: 'bool',
        note: 'string'
    }
}

// Get the default Realm with support for our objects
export default Realm.open({schema: [MessageSchema]})