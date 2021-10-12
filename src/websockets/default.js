const Responses = require('../common/Responses');


exports.handler = () => {
    
    return Responses._200({ message: 'default' });

}
