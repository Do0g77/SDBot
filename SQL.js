var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});


var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());
// potential to use server.post('sjh-assysttest/assystbot/api/messages', connection.listen());




//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', [
    function(session) {
        // Send a greeting and show help.
        var card = new builder.HeroCard(session)
            .title("AssystBot")
            .text("Chase up and Close Calls")
            .images([
                builder.CardImage.create(session, "http://www.focusapac.com/uploads/5/2/0/8/52083989/published/logo-assystpartner-cmyk.jpg?1491510468")
            ]);
        var msg = new builder.Message(session).attachments([card]);
        session.send(msg);
        session.send("Hi... Thanks for contacting me, I am Assystbot and I can Chaseup or Close a call for you.");
        session.beginDialog('/help');


    },

    function(session, results) {
        // Display menu
        session.beginDialog('/Menu');
    },

]);




//=========================================================
// Bots Global Actions
//=========================================================

bot.endConversationAction('goodbye', 'Goodbye :)', { matches: /^goodbye/i });
bot.beginDialogAction('help', '/help', { matches: /^help/i });
bot.beginDialogAction('Outlook', '/outlook', { matches: /^outlook/i });
bot.beginDialogAction('Printer', '/printer', { matches: /^printer/i });
bot.beginDialogAction('Start', '/Start', { matches: /^start/i });
bot.beginDialogAction('Mailbox', '/outlook', { matches: /^mailbox/i });
bot.beginDialogAction('IT Security', '/outlook', { matches: /^security/i });
bot.beginDialogAction('Network Access', '/printer', { matches: /^network/i });
bot.beginDialogAction('Email Grid', '/printer', { matches: /^grid/i });
bot.beginDialogAction('Google', '/google', { matches: /^google/i });
bot.beginDialogAction('Software', '/google', { matches: /^software/i });
bot.beginDialogAction('Google', '/google', { matches: /^fault/i });
bot.beginDialogAction('iguana', '/iguana', { matches: /^iguana/i });



bot.dialog('/Start', [
    function(session) {


        // Send a greeting and show help.


        var card = new builder.HeroCard(session)
            .title("AssystBot")
            .text("Chase up and Close Calls")
            .images([
                builder.CardImage.create(session, "http://www.focusapac.com/uploads/5/2/0/8/52083989/published/logo-assystpartner-cmyk.jpg?1491510468")
            ]);
        var msg = new builder.Message(session).attachments([card]);
        session.send(msg);
        session.send("Hi... Thanks for contacting me, I am Assystbot and I can Chaseup or Close a call for you.");
        session.beginDialog('/help');


    },
]);

// Helpmenu commands


bot.dialog('/help', [
    function(session) {
        session.endDialog("Global commands that are available anytime:\n\n* Start - Exits the current request and returns to the start.\n* Goodbye - End this conversation.\n* Help - Displays these commands.");
    }
]);

bot.dialog('/iguana', [
    function(session) {
        session.endDialog("Yes, in fact i have. There are pictures here: https://www.google.co.uk/search?q=iguana+playing+trombone&client=firefox-b&dcr=0&source=lnms&tbm=isch&sa=X&ved=0ahUKEwi708PUy9TWAhWoJ5oKHRy9BhIQ_AUICigB&biw=1899&bih=931#imgrc=Ud96P1n-7n6dYM:.");
    }
]);



// This is the waterfall for the updating of a call in Assyst. 



bot.dialog('/Menu', [
    function(session) {

        builder.Prompts.number(session, 'What is the Assyst reference number, it either begins 6***** or R******?');

    },



    function(session, results) {
        session.dialogData.conclusions = results.response;
        builder.Prompts.text(session, "And would you like to CLOSE or CHASE up the call?");

    },


    function(session, results) {
        session.dialogData.comments = results.response;
        builder.Prompts.text(session, "Would you like to add any comments?");

    },

    function(session, results) {
        session.dialogData.calldetails = results.response;



        // Process request and display details in a card format

        session.send("Assyst Call Details: <br/>Bot Reference: %s <br/>Action Type: %s <br/>Closing Comment: %s",
            session.dialogData.conclusions, session.dialogData.comments, session.dialogData.calldetails);
        builder.Prompts.confirm(session, "This is what you inputted, is it correct?");

    },

    function(session, results) {
        session.dialogData.returninfo = results.response;
        builder.Prompts.text(session, "Thanks, I will change this within the system and you will get email confirmation soon. If there are anymore issues please call 85050. Goodbye :)");


    },


]);

bot.dialog('/google', [

    function(session) {
        session.send("google.");



        // Ask the user to select an item from a carousel.



        var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments([
                new builder.HeroCard(session)
                .title("google")
                .text("Click below to get detailed instructions on how to google something.")
                .images([
                    builder.CardImage.create(session, "https://www.google.co.uk/logos/doodles/2017/fall-equinox-2017-northern-hemisphere-5921669083299840.2-law.gif")
                    .tap(builder.CardAction.showImage(session, "http://lmgtfy.com/?iie=1&q=remediate")),
                ])
                .buttons([
                    builder.CardAction.openUrl(session, "http://lmgtfy.com/?iie=1&q=remediate", "Google"),

                ]),
                new builder.HeroCard(session)
                .title("Software")
                .text("Click below for a link to request additional software on your PC.")
                .images([
                    builder.CardImage.create(session, "https://upload.wikimedia.org/wikipedia/commons/7/7e/Floppy_disk_300_dpi.jpg")
                    .tap(builder.CardAction.showImage(session, "https://upload.wikimedia.org/wikipedia/commons/7/7e/Floppy_disk_300_dpi.jpg")),
                ])
                .buttons([
                    builder.CardAction.openUrl(session, "http://assyst/assystnet/#serviceOfferings/19", "Software Instal"),

                ]),
                new builder.HeroCard(session)
                .title("Fault")
                .text("Click below to Log a Fault.")
                .images([
                    builder.CardImage.create(session, "http://da1urhpfd469z.cloudfront.net/uploads/advertphotos/17/0512/30466114-836-628x428.jpg")
                    .tap(builder.CardAction.showImage(session, "http://da1urhpfd469z.cloudfront.net/uploads/advertphotos/17/0512/30466114-836-628x428.jpg"))
                ])
                .buttons([
                    builder.CardAction.openUrl(session, "http://assyst/assystnet/#serviceOfferings/11", "Log a Fault"),

                ])
            ]);
        builder.Prompts.choice(session, msg, "o");
    },
    function(session, results) {
        var action, item;
        var kvPair = results.response.entity.split(':');
        switch (kvPair[0]) {
            case 'select':
                action = 'selected';
                break;
        }
        switch (kvPair[1]) {

            case '101':
                item = "http://assyst/assystnet";
                break;

        }
        session.endDialog('You %s "%s"', action, item);
    }
]);

;


bot.dialog('/outlook', [

    function(session) {
        session.send("Below is a list of helpful guides.");



        // Ask the user to select an item from a carousel.



        var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments([
                new builder.HeroCard(session)
                .title("Outlook Setup")
                .text("Click below to get detailed instructions on how to set up your email account.")
                .images([
                    builder.CardImage.create(session, "https://www.microsoft.com/en-gb/outlook-com/img/icon-outlook.svg")
                    .tap(builder.CardAction.showImage(session, "http://assyst/assystnet/#faqDetail/23")),
                ])
                .buttons([
                    builder.CardAction.openUrl(session, "http://assyst/assystnet/#faqDetail/23", "Outlook Setup"),

                ]),
                new builder.HeroCard(session)
                .title("Mailbox")
                .text("Click below for a link to how to add another mailbox to your existing email account.")
                .images([
                    builder.CardImage.create(session, "https://upload.wikimedia.org/wikipedia/commons/a/ad/Trevarren_Post_box.JPG")
                    .tap(builder.CardAction.showImage(session, "https://upload.wikimedia.org/wikipedia/commons/a/ad/Trevarren_Post_box.JPG")),
                ])
                .buttons([
                    builder.CardAction.openUrl(session, "http://assyst/assystnet/#faqDetail/24", "Mailbox Setup"),

                ]),
                new builder.HeroCard(session)
                .title("IT Security")
                .text("Click below to access the IT Security Policy.")
                .images([
                    builder.CardImage.create(session, "https://www.verdict.co.uk/wp-content/uploads/2017/04/cyber-security.jpg")
                    .tap(builder.CardAction.showImage(session, "https://www.verdict.co.uk/wp-content/uploads/2017/04/cyber-security.jpg"))
                ])
                .buttons([
                    builder.CardAction.openUrl(session, "http://assyst/assystnet/#faqDetail/21", "IT Security Policy"),

                ])
            ]);
        builder.Prompts.choice(session, msg, "o");
    },
    function(session, results) {
        var action, item;
        var kvPair = results.response.entity.split(':');
        switch (kvPair[0]) {
            case 'select':
                action = 'selected';
                break;
        }
        switch (kvPair[1]) {

            case '101':
                item = "http://assyst/assystnet";
                break;

        }
        session.endDialog('You %s "%s"', action, item);
    }
]);

;




// Dialogue for when a customer adds the Bot to their contacts

bot.on('contactRelationUpdate', function(message) {
    if (message.action === 'add') {
        var name = message.user ? message.user.name : null;
        var reply = new builder.Message()
            .address(message.address)
            .text("Hello %s... Thanks for adding me.", name || 'there');
        bot.send(reply);
    }
});

bot.dialog('/printer', [

    function(session) {
        session.send("Below is a list of helpful guides.");



        // Ask the user to select an item from a carousel.




        var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments([
                new builder.HeroCard(session)
                .title("Printer Setup")
                .text("Click below to find out how to set up a Printer on Windows 7.")
                .images([
                    builder.CardImage.create(session, "http://www.mcmcse.com/comptia/aplus/notes/images/dot_matrix.jpg")
                    .tap(builder.CardAction.showImage(session, "http://assyst/assystnet/#faqDetail/23")),
                ])
                .buttons([
                    builder.CardAction.openUrl(session, "http://assyst/assystnet/#faqDetail/23", "Printer Setup"),

                ]),
                new builder.HeroCard(session)
                .title("Network Access")
                .text("Click below to obtain the form for accessing or network.")
                .images([
                    builder.CardImage.create(session, "https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAAhqAAAAJDJlMGY4M2MxLTA5NTQtNDdlNi04MTk2LWM2YTM2YzViNmU2Nw.jpg")
                    .tap(builder.CardAction.showImage(session, "https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAAhqAAAAJDJlMGY4M2MxLTA5NTQtNDdlNi04MTk2LWM2YTM2YzViNmU2Nw.jpg")),
                ])
                .buttons([
                    builder.CardAction.openUrl(session, "http://assyst/assystnet/#faqDetail/22", "Network Access"),

                ]),
                new builder.HeroCard(session)
                .title("Safely send emails")
                .text("Click below for access to the safe send email grid.")
                .images([
                    builder.CardImage.create(session, "http://privacydatasystems.files.wordpress.com/2014/09/email_security-keyboard.jpg")
                    .tap(builder.CardAction.showImage(session, "http://privacydatasystems.files.wordpress.com/2014/09/email_security-keyboard.jpg"))
                ])
                .buttons([
                    builder.CardAction.openUrl(session, "http://assyst/assystnet/#faqDetail/25", "IT Security Policy"),

                ])
            ]);
        builder.Prompts.choice(session, msg, "select:101");
    },
    function(session, results) {
        var action, item;
        var kvPair = results.response.entity.split(':');
        switch (kvPair[0]) {
            case 'select':
                action = 'selected';
                break;
        }
        switch (kvPair[1]) {

            case '101':
                item = "http://assyst/assystnet";
                break;

        }
        session.endDialog('You %s "%s"', action, item);
    }
]);

;