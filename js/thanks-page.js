import Constants from './constants';
import StaticKit from './static-kit';
import Utils from './utils';


const patterns = {
    url: /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/g,
};

function start() {
    let tweet = Constants.tweet;
    tweet = addHandlesToTweet(tweet);
    const preview = addColorSpansToTweet(tweet);

    $('.twitter-tool .tweet').html(preview);

    $('.twitter-tool-cta').on('click', e => {
        e.preventDefault();

        const url =
            'https://twitter.com/intent/tweet?text=' +
            encodeURIComponent(tweet);
        window.open(url);
    });

    $('.twitter-tool').addClass('visible');
}

function getTweetLength(tweet) {
    let length = tweet.length;

    // URLs cost 23 characters
    const urls = tweet.match(patterns.url);
    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        length -= url.length;
        length += 23;
    }

    return length;
}

function addHandlesToTweet(tweet) {
    let charactersLeft = 140 - getTweetLength(tweet);

    Utils.shuffle(Constants.twitterHandles);
    for (let i = 0; i < Constants.twitterHandles.length; i++) {
        const addition = ' ' + Constants.twitterHandles[i];
        const length = addition.length;
        if (length < charactersLeft) {
            tweet += addition;
            charactersLeft -= length;
        }
    }
    return tweet;
}

function addColorSpansToTweet(tweet) {
    tweet = tweet.replace(/#\w+/g, match => `<span class="blue">${match}</span>`);
    tweet = tweet.replace(/@\w+/g, match => `<span class="blue">${match}</span>`);
    tweet = tweet.replace(/https?:\/\/[\w.]+/g, match => `<span class="blue">${match}</span>`);
    return tweet;
}

function onTweetFormSubmit(e) {
    e.preventDefault();

    var tweet = `.@${state.twitterIDs.join(' @')} ${state.twitterText}`;

    var url =
        'https://twitter.com/intent/tweet?text=' +
        encodeURIComponent(tweet);

    window.open(url);

    // Show thanks
    var $submit = $('.tweet-wrapper button');
    $submit.addClass('thanks');
    $submit.text('Thanks!');

    // Send event
    ga('send', {
        hitType       : 'event',
        eventCategory : 'ThanksPageTweet',
        eventAction   : 'sent',
        eventLabel    : Constants.actionKitPage,
    });
}

export default {
    start,
};
