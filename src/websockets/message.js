const Responses = require('../common/Responses');
const Dynamo = require('../common/Dynamo');
const WebSocket = require('../common/Websocket');

const tableNameWS = process.env.tableNameWS;
const tableName = process.env.tableName;

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

exports.handler = async event => {
    console.log('event', event);

    const { connectionId: connectionID } = event.requestContext;

    const body = JSON.parse(event.body);

    try {
        const record = await Dynamo.get(connectionID, tableNameWS);
        const { messages, domainName, stage } = record;

        messages.push(body.message);

        const data = {
            ...record,
            messages,
        };

        await Dynamo.write(data, tableNameWS);

        const words = await Dynamo.all(tableName)

        randomValue = getRandomArbitrary(0, words.length)
       
        await WebSocket.send({
            domainName,
            stage,
            connectionID,
            message: words[randomValue].word,
        });
        
        console.log('sent message');

        return Responses._200({ message: 'got a message' });
    } catch (error) {
        console.log(error)
        return Responses._400({ message: 'message could not be received' });
    }

};
