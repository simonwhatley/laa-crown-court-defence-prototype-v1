var autocomplete = function(options) {

  var sourceSelect = function(query, callback) {

    var optionsWithAValue = [].filter.call(options.selectElement.options, function(option) {
      return option.value != ''
    });

    var things = optionsWithAValue.map(function(select) {

      var dataAbbreviations = select.getAttribute('data-abbreviations');
      dataAbbreviations = dataAbbreviations ? dataAbbreviations.split('|') : [];

      var dataOtherNames = select.getAttribute('data-other-names');
      dataOtherNames = dataOtherNames ? dataOtherNames.split('|') : [];

      return {
        'name': select.label,
        'abbreviations': dataAbbreviations,
        'other_names': dataOtherNames
      }
    });

    var regexes = query.trim().split(/\s+/).map(function(word) {
      var pattern = '\\b' + word.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
      return new RegExp(pattern, 'i');
    });

    var matches = things.map(function(thing) {

      var allNames = [thing.name]
        .concat(thing.other_names)
        .concat(thing.abbreviations)
        .filter(function(name) {
          return name;
        });

      thing['resultPosition'] = null;

      for (var i = 0; i < allNames.length; i++) {

        var matches = regexes.reduce(function(acc, regex) {

          matchPosition = allNames[i].search(regex);
          if (matchPosition > -1) {
            acc.count += 1;

            if (acc.lowestPosition == -1 || matchPosition < acc.lowestPosition) {
              acc.lowestPosition = matchPosition;
            }
          }

          return acc;

        }, {'count': 0, 'lowestPosition': -1});


        if (matches.count == regexes.length && (thing['resultPosition'] == null || matches.lowestPosition < thing['resultPosition'])) {
          thing['resultPosition'] = matches.lowestPosition;
        }
      }

      return thing;

    });

    var filteredMatches = matches.filter(function(thing) {
      return (thing['resultPosition'] != null);
    });

    var sortedFilteredMatches = filteredMatches.sort(function(thingA, thingB) {

      if ( thingA['resultPosition'] < thingB['resultPosition'] ) {
        return -1;
      } else if ( thingA['resultPosition'] > thingB['resultPosition'] ) {
        return 1;
      } else {
        return 0;
      }
    })

    var results = sortedFilteredMatches.map(function(thing) {
      return thing['name'];
    });

    return callback(results);
  }

  options.source = sourceSelect;

  accessibleAutocomplete.enhanceSelectElement(options);

}