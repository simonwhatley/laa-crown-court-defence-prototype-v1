/* global $ */
/* global GOVUK */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  // Use GOV.UK shim-links-with-button-role.js to trigger a link styled to look like a button,
  // with role="button" when the space key is pressed.
  GOVUK.shimLinksWithButtonRole.init();

  // Details/summary polyfill from frontend toolkit
  GOVUK.details.init();

  // Prevent browsers from storing/caching input data-target
  $('form').attr('autocomplete', 'off');

  // Disable autocorrect, autocapitalize and spellcheck
  $('input, textarea').attr('autocorrect', 'off').attr('autocapitalize', 'off').attr('spellcheck', 'false');

  // Show and hide toggled content
  // Where .multiple-choice uses the data-target attribute
  // to toggle hidden content
  var showHideContent = new GOVUK.ShowHideContent();
  showHideContent.init();

  // Use GOV.UK stick-at-top-when-scrolling.js to trigger sticky content
  // Use with class="js-stick-at-top-when-scrolling"
  GOVUK.stickAtTopWhenScrolling.init();
})


// ---------------------------------------
// Add another item JS
// ---------------------------------------

$(document).on('click', '.button-add-another', function (e) {
  var beforeThis = $(this).parents('form > .grid-row');
  e.preventDefault();
  insertFields(beforeThis);
  sortFields();
});

$(document).on('click', '.remove-list-item', function (e) {
  e.preventDefault();
  $(this).parents('.list-item-wrapper').remove();
  sortFields();
});

function insertFields(element) {
  element.before(
    '<div class="grid-row">' +
      '<div class="form-group-compound list-item-wrapper">' +
        '<h2 class="heading-medium">Item 1</h2>' +
        '<fieldset>' +
          '<div class="column-one-third no-padding">' +
            '<div class="form-group list-item">' +
              '<label class="form-label" for="field-x">' +
                'Field label' +
              '</label>' +
              '<input type="text" class="form-control" id="field-x" name="field-x">' +
            '</div>' +
          '</div>' +
          '<div class="column-one-third no-padding">' +
            '<div class="form-group list-item">' +
              '<label class="form-label" for="field-x">' +
                'Field label' +
              '</label>' +
              '<input type="text" class="form-control" id="field-x" name="field-x">' +
            '</div>' +
          '</div>' +
          '<div class="column-one-third no-padding">' +
            '<div class="list-item">' +
            '</div>' +
          '</div>' +
        '</fieldset>' +
        '<hr />' +
      '</div>' +
    '</div>'
  );
}

function sortFields() {
  var listCounter = 1;
  var inputCounter = 1;

  $(document).find('.list-item-wrapper').each(function () {
    $(this).find('h2').text('Item ' + listCounter);

    if ($(this).find('.remove-list-item').length === 0) {
      $(this).find('.list-item:last').append('<a id="remove-item-' + listCounter + '" class="remove-list-item" href="#">Remove this</a>');
    } else {
      $(this).find('.remove-list-item').attr('id', 'remove-item-' + listCounter);
    }

    $(this).find('.list-item').children('label').each(function () {
      $(this).attr('for', 'field-' + inputCounter);
      inputCounter++;
    });

    $(this).find('.list-item').children('input').each(function () {
      var labelNo = $(this).parent().find('label').attr('for').split('-').pop();
      $(this).attr('id', 'field-' + labelNo);
      $(this).attr('name', 'field-' + labelNo);
    });

    listCounter++;
  });

  if ($(document).find('.list-item-wrapper').length === 1) {
    $('.remove-list-item').remove();
  }
}


// ---------------------------------------
// Password show/hide JS
// ---------------------------------------

$('#password + .fa').on('click', function() {
  $(this).toggleClass('fa-eye-slash').toggleClass('fa-eye'); // toggle our classes for the eye icon
  $('#password').togglePassword(); // activate the hideShowPassword plugin
});

// $('#password-2').showPassword('focus', {
//   toggle: { className: 'show-hide' }
// });


$('#password-2').hideShowPassword({
  show: false,
  innerToggle: 'focus',
  toggle: {
    className: 'show-hide'
  }
});


// $("#offence-category").depdrop({
//     url: '/playground/dependant-dropdowns/data/offences.json',
//     depends: ['offence-class']
// });


// ---------------------------------------
// Accordion JS
// ---------------------------------------

if (
  'addEventListener' in document &&
  document.querySelectorAll
  ) {

  document.addEventListener('DOMContentLoaded', function() {

    var accordions = document.querySelectorAll('.accordion')

    for (var i = accordions.length - 1; i >= 0; i--) {
      new Accordion(accordions[i])
    };

  })

}