import StaticKit from './static-kit';


// Container
var constants = {};

// General
constants.domain = 'endsuperdelegates.com';

// Social
constants.emailSubject = 'Sign this petition: Tell the House to shut down backdoor surveillance';
constants.emailBody = `Hi,

I just signed a petition at StopMassSpying.com telling the House to pass the Massie-Lofgren amendment.

It would: 

1) Ban the NSA and FBI from conducting "backdoor" database searches for information about Americans, and 

2) Ban the NSA and FBI from mandating that private companies add backdoors to the encryption standards that are in place to keep technology users safe from malicious data thefts.

Will you take a moment to contact the House?

https://${constants.domain}/?source=${StaticKit.query.cleanedSource}-emailshare

Thanks!`;
constants.tweetText      = `Let's pass the Massie-Lofgren amendment and shut down backdoor surveillance! https://stopmassspying.com`;

// APIs
constants.actionKitPage = 'endsuperdelegates-www-before-partners';
constants.callToolURL = 'https://dp-call-congress.herokuapp.com/create?callback=?';
constants.feedbackToolURL = 'https://dp-feedback-tool.herokuapp.com/api/v1/feedback?callback=?';
constants.sunlightAPIKey = '3779f52f552743d999b2c5fe1cda70b6';
constants.sunlightLocateURL = 'https://congress.api.sunlightfoundation.com/legislators/locate?callback=?';

// Validation
constants.requiredFields = [
    'email',
    'postcode',
    // 'first_name',
    // 'last_name',
];

// Names
constants.orgNames = {
    credo: 'CREDO Action',
    dk: 'Daily Kos',
    dp: 'Demand Progress',
    fftf: 'Fight for the Future',
    rootsaction: 'RootsAction',
    watchdog: 'Watchdog.net',
};

export default constants;
