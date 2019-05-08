// Server entry point, imports all server code

import '/imports/startup/server';
import '/imports/startup/both';

// function insertLink(title, url) {
//   Links.insert({ title, url, createdAt: new Date() });
// }

Meteor.startup(() => {
// If the Links collection is empty, add some data.
// if (Links.find().count() === 0) {
//   insertLink(
//     'Do the Tutorial',
//     'https://www.meteor.com/tutorials/react/creating-an-app'
//   );

//   insertLink(
//     'Follow the Guide',
//     'http://guide.meteor.com'
//   );

//   insertLink(
//     'Read the Docs',
//     'https://docs.meteor.com'
//   );

//   insertLink(
//     'Discussions',
//     'https://forums.meteor.com'
//   );
// }
    console.log("Server Started");
    // set up the MAIL_URL environment variable
    //process.env.MAIL_URL = 'smtp://noreply%40winspire.co:WinspireNoReply!@a2plcpnl0573.prod.iad2.secureserver.net:465';
  
    if(Meteor.settings.public.enableEmailDelivery)
    {
      //console.log("Email Delivery Status : True");
      //process.env.MAIL_URL = 'smtp://AKIAJCIQJWC6ZEVCZ7YQ:AsZfuShmjzy9hMpirnRe6jxnQBgIJmy69B7EZKf2MN59!@email-smtp.us-east-1.amazonaws.com:587';
    }
    else{
      //console.log("Email Delivery Status : False");
      //process.env.MAIL_URL = 'smtp://noreply%40winspire.co:WinspireNoReply!@a2plcpnl0573.prod.iad2.secureserver.net:465';
      process.env.MAIL_URL = "";
    }
  
  });
