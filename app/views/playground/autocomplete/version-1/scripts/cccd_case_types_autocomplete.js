var cccdCaseTypesAutocomplete = function(options) {

  var sourceSelect = function(query, callback) {

    var optionsWithAValue = [].filter.call(options.selectElement.options, function(option) {
      return option.value != ''
    })

    var orgs = optionsWithAValue.map(function(select) {

      var dataAbbreviations = select.getAttribute('data-abbreviations');
      dataAbbreviations = dataAbbreviations ? dataAbbreviations.split('|') : []

      var dataOtherNames = select.getAttribute('data-other-names');
      dataOtherNames = dataOtherNames ? dataOtherNames.split('|') : []

      return {
        'name': select.label,
        'abbreviations': dataAbbreviations,
        'other_names': dataOtherNames
      }
    })

    var regexes = query.trim().split(/\s+/).map(function(word) {
      return new RegExp('\\b' + word, 'i')
    })

    var matches = orgs.map(function(caseType) {

      var allNames = [caseType.name]
        .concat(caseType.other_names)
        .concat(caseType.abbreviations)
        .filter(function(name) { return name })

      caseType['resultPosition'] = null


      for (var i = 0; i < allNames.length; i++) {

        var matches = regexes.reduce(function(acc, regex) {

          matchPosition = allNames[i].search(regex)
          if (matchPosition > -1) {
            acc.count += 1

            if (acc.lowestPosition == -1 || matchPosition < acc.lowestPosition) {
              acc.lowestPosition = matchPosition
            }
          }

          return acc;

        }, {'count': 0, 'lowestPosition': -1})


        if (matches.count == regexes.length && (caseType['resultPosition'] == null || matches.lowestPosition < caseType['resultPosition'])) {
          caseType['resultPosition'] = matches.lowestPosition
        }
      }

      return caseType

    })

    var filteredMatches = matches.filter(function(caseType) {
      return (caseType['resultPosition'] != null )
    })

    var sortedFilteredMatches = filteredMatches.sort(function(caseTypeA, caseTypeB) {

      if (caseTypeA['resultPosition'] < caseTypeB['resultPosition'] ) {
        return -1
      } else if (caseTypeA['resultPosition'] > caseTypeB['resultPosition'] ) {
        return 1
      } else {
        return 0
      }
    })

    var results = sortedFilteredMatches.map(function(caseType) { return caseType['name'] })

    return callback(results)
  }


  options.source = sourceSelect

  accessibleAutocomplete.enhanceSelectElement(options)

}
