import StaticKit from './static-kit';


// Container
var constants = {};

// General
constants.domain = 'endsuperdelegates.com';

// Social
constants.emailSubject = 'Sign this petition: End Superdelegates';
constants.emailBody = `Hi,

I just signed a petition at EndSuperdelegates.com telling the Democratic Party to eliminate the concept of so-called “superdelegates.”

Will you take a moment to contact the Democratic Party?

https://${constants.domain}/?source=${StaticKit.query.cleanedSource}-emailshare

Thanks!`;
constants.tweetText      = `Make the Democratic Party democratic: It's time to #EndSuperDelegates #DNC2016 https://endsuperdelegates.com`;

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
