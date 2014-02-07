// @see https://github.com/twitter/typeahead.js/blob/master/doc/bloodhound.md
var engine = new Bloodhound({
  datumTokenizer: function (datum) {
    return Bloodhound.tokenizers.whitespace(datum.name);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: {
    url: 'http://jsonpdataproxy.appspot.com/?format=json&max-results=10000&url=https://raw.github.com/opencivicdata/ocd-division-ids/master/identifiers/country-ca.csv',
    filter: function (data) {
      return $.map([data.fields].concat(data.data), function (row) {
        return {identifier: row[0], name: row[1]};
      });
    }
  }
});

engine.initialize().done(function () {
  $('#typeahead').typeahead({
    autoselect: true,
    highlight: true
  }, {
    displayKey: 'name',
    source: engine.ttAdapter(),
    templates: {
      suggestion: Handlebars.compile('<p><span class="name">{{name}}</span><span class="identifier">{{identifier}}</span></p>')
    }
  });

  $('#typeahead').bind('typeahead:selected', function (event, datum, name) {
  });
});
