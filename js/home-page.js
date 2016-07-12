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
    $(window).on('scroll resize', onScroll);
    $(window).on('resize', onResize);

    $(window).trigger('scroll');
    $(window).trigger('resize');
}

function onResize(e) {
    const width = $('body').width();
    let right = 16;
    if (width > 1100) {
        right += (width - 1100) / 2;
    }
    $('.action').css('right', right);
}

function onScroll(e) {
    const containerHeight = $('.petition-and-form-wrapper .outer-padding').outerHeight();
    const formHeight = $('.action').outerHeight();
    const petitionOffset = $('.petition').offset();
    const scrollTop = $(window).scrollTop();
    const suggestedPadding = 16;

    if (scrollTop <= petitionOffset.top) {
        $('.action')
            .removeClass('anchored-to-bottom')
            .removeClass('floating')
            .addClass('anchored-to-top');
        return;
    }

    const maxTop = containerHeight - formHeight - suggestedPadding * 3;
    if (maxTop < scrollTop - petitionOffset.top) {
        $('.action')
            .removeClass('anchored-to-top')
            .removeClass('floating')
            .addClass('anchored-to-bottom');
        return;
    }

    $('.action')
        .removeClass('anchored-to-top')
        .removeClass('anchored-to-bottom')
        .addClass('floating');
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
