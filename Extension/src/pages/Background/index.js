import {CommunicateToContent} from './CommunicateToContent';


console.log('This is the background page.');
console.log('Put the background scripts here.');

CommunicateToContent.addListenerForReceivingMessage();
// CommunicateToContent.sendResponseToContent();