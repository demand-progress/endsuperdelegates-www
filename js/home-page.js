// Modules
import Constants from './constants';
import each from 'lodash/each';
import Email from './email';
// import FlipCounter from './flip-counter';
import Modal from './modal';
import StaticKit from './static-kit';


function start() {
    // Populate special form fields
    $('[name=action_user_agent]').val(navigator.userAgent);
    $('[name=source]').val(StaticKit.query.cleanedSource);
    $('[name=url]').val(location.href);

    // Disclaimer
    updateDisclaimer();

    // Sticky form
    setupStickyForm();

    // Signature form
    setupSignatureForm();

    // // Counter
    // FlipCounter.update(Constants.actionKitPage);
}

function setupStickyForm() {
    const scrollCallbackDelay = 64;
    let scrollTimeout = null;
    $(window).on('scroll resize', e => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(f => {
            onScroll(e);
        }, scrollCallbackDelay);
    });
    $(window).trigger('scroll');
    // $(window).on('scroll resize', onScroll);
}

function onScroll(e) {
    console.log('Scroll!');
    const scrollTop = $(window).scrollTop();
    const containerHeight = $('.petition-and-form-wrapper .outer-padding').outerHeight();
    const formHeight = $('.action').outerHeight();
    const formOffset = $('.petition').offset();
    const suggestedPadding = 16;

    const maxTop = containerHeight - formHeight - suggestedPadding * 2;

    console.log(scrollTop);
    console.log(formOffset);
    console.log(suggestedPadding);

    let targetY = scrollTop - formOffset.top + suggestedPadding;
    if (targetY < 0) {
        targetY = 0;
    }
    if (targetY > maxTop) {
        targetY = maxTop;
    }

    $('.action').css('top', targetY);
}

function setupSignatureForm() {
    let readyToSubmit = false;
    const $signatureForm = $('.action form');
    $signatureForm.on('submit', e => {
        if (readyToSubmit) {
            return;
        }

        e.preventDefault();
        let valid = true;

        each(Constants.requiredFields, field => {
            if (!valid) {
                return;
            }

            console.log(field);

            const $field = $('#' + field);
            const value  = $field.val() && $field.val().trim();
            if (!value) {
                alert('Please enter your ' + $field.attr('placeholder'));
                $field.focus();

                valid = false;
            }
        });

        if (!valid) {
            return false;
        }

        const email = $('#email').val().trim().toLowerCase();

        if (!Email.validate(email)) {
            $('#email').focus();
            alert('Please enter your valid email');
            return false;
        }

        const zip = $('#postcode').val().trim();
        try {
            sessionStorage.zip = zip;
        } catch (e) {}

        // Thanking user, and disabling form
        $('form button').attr('disabled', true);
        $('#thanks').css({
            display : 'block',
            opacity : 1,
        });

        readyToSubmit = true;
        $signatureForm.submit();
    });
}

function updateDisclaimer() {
    const pattern = /_ns$/;
    const source = StaticKit.query.cleanedSource;
    if (!source.match(/_ns$/)) {
        return;
    }

    const key = source.replace(pattern, '');
    const orgName = Constants.orgNames[key];
    if (orgName) {
        $('.disclaimer .org-name').text(orgName);
    }

    $('.disclaimer').css({ display: 'block' });
    $('.squaredFour').remove();
}

export default {
    start,
};
