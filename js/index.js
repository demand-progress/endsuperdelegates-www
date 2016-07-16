// Modules
import Analytics from './analytics';
import Constants from './constants';
import FastClick from 'fastclick';
import HomePage from './home-page';
import Modal from './modal';
import StaticKit from './static-kit';
import Utils from './utils';
import ThanksPage from './thanks-page';


// FastClick for mobile
FastClick.attach(document.body);

// After the page loads
$(f => {
    // Set up modals
    Modal.setup();

    // Animated scrolls
    $('.animated-scroll').on('click', e => {
        e.preventDefault();

        var target = $(e.target).data('target');
        $('html, body').stop().animate({
            scrollTop: $(target).offset().top - 16,
        }, 640);
    });

    // Social links for Facebook
    $('a.facebook').on('click', e => {
        e.preventDefault();

        var url =
            'https://www.facebook.com/sharer/sharer.php?u=' +
            encodeURIComponent(`${Constants.domain}/?source=${StaticKit.query.cleanedSource}-fbshare`);
        window.open(url);
    });

    // Social links for Twitter
    $('a.twitter').on('click', e => {
        e.preventDefault();

        Utils.shuffle(Constants.twitterHandles);

        let charactersLeft = 38;
        let tweet = Constants.tweet;
        for (let i = 0; i < Constants.twitterHandles.length; i++) {
            const addition = ' ' + Constants.twitterHandles[i];
            const length = addition.length;
            if (length < charactersLeft) {
                tweet += addition;
                charactersLeft -= length;
            }
        }

        var url =
            'https://twitter.com/intent/tweet?text=' +
            encodeURIComponent(tweet);
        window.open(url);
    });

    // Social links for Email
    $('a.email').on('click', e => {
        e.preventDefault();

        var url =
            'mailto:?subject=' + encodeURIComponent(Constants.emailSubject) +
            '&body=' + encodeURIComponent(Constants.emailBody);
        window.location.href = url;
    });

    // Page specific code
    var pageKey = $('body').data('page');
    switch (pageKey) {
        case 'home':
            HomePage.start();
            break;

        case 'thanks':
            ThanksPage.start();
            break;
    }

    // Google Analytics
    Analytics.embed();
});
