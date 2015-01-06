var map = {'À': 'a', 'Á': 'a', 'Â': 'a', 'Ã': 'a', 'Ä': 'a', 'Å': 'a', 'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'Ā': 'a', 'ā': 'a', 'Ă': 'a', 'ă': 'a', 'Ą': 'a', 'ą': 'a', 'Ç': 'c', 'ç': 'c', 'Ć': 'c', 'ć': 'c', 'Ĉ': 'c', 'ĉ': 'c', 'Ċ': 'c', 'ċ': 'c', 'Č': 'c', 'č': 'c', 'Ð': 'd', 'ð': 'd', 'Ď': 'd', 'ď': 'd', 'Đ': 'd', 'đ': 'd', 'È': 'e', 'É': 'e', 'Ê': 'e', 'Ë': 'e', 'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e', 'Ē': 'e', 'ē': 'e', 'Ĕ': 'e', 'ĕ': 'e', 'Ė': 'e', 'ė': 'e', 'Ę': 'e', 'ę': 'e', 'Ě': 'e', 'ě': 'e', 'Ĝ': 'g', 'ĝ': 'g', 'Ğ': 'g', 'ğ': 'g', 'Ġ': 'g', 'ġ': 'g', 'Ģ': 'g', 'ģ': 'g', 'Ĥ': 'h', 'ĥ': 'h', 'Ħ': 'h', 'ħ': 'h', 'Ì': 'i', 'Í': 'i', 'Î': 'i', 'Ï': 'i', 'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i', 'Ĩ': 'i', 'ĩ': 'i', 'Ī': 'i', 'ī': 'i', 'Ĭ': 'i', 'ĭ': 'i', 'Į': 'i', 'į': 'i', 'İ': 'i', 'ı': 'i', 'Ĵ': 'j', 'ĵ': 'j', 'Ķ': 'k', 'ķ': 'k', 'ĸ': 'k', 'Ĺ': 'l', 'ĺ': 'l', 'Ļ': 'l', 'ļ': 'l', 'Ľ': 'l', 'ľ': 'l', 'Ŀ': 'l', 'ŀ': 'l', 'Ł': 'l', 'ł': 'l', 'Ñ': 'n', 'ñ': 'n', 'Ń': 'n', 'ń': 'n', 'Ņ': 'n', 'ņ': 'n', 'Ň': 'n', 'ň': 'n', 'ŉ': 'n', 'Ŋ': 'n', 'ŋ': 'n', 'Ò': 'o', 'Ó': 'o', 'Ô': 'o', 'Õ': 'o', 'Ö': 'o', 'Ø': 'o', 'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ø': 'o', 'Ō': 'o', 'ō': 'o', 'Ŏ': 'o', 'ŏ': 'o', 'Ő': 'o', 'ő': 'o', 'Ŕ': 'r', 'ŕ': 'r', 'Ŗ': 'r', 'ŗ': 'r', 'Ř': 'r', 'ř': 'r', 'Ś': 's', 'ś': 's', 'Ŝ': 's', 'ŝ': 's', 'Ş': 's', 'ş': 's', 'Š': 's', 'š': 's', 'ſ': 's', 'Ţ': 't', 'ţ': 't', 'Ť': 't', 'ť': 't', 'Ŧ': 't', 'ŧ': 't', 'Ù': 'u', 'Ú': 'u', 'Û': 'u', 'Ü': 'u', 'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'Ũ': 'u', 'ũ': 'u', 'Ū': 'u', 'ū': 'u', 'Ŭ': 'u', 'ŭ': 'u', 'Ů': 'u', 'ů': 'u', 'Ű': 'u', 'ű': 'u', 'Ų': 'u', 'ų': 'u', 'Ŵ': 'w', 'ŵ': 'w', 'Ý': 'y', 'ý': 'y', 'ÿ': 'y', 'Ŷ': 'y', 'ŷ': 'y', 'Ÿ': 'y', 'Ź': 'z', 'ź': 'z', 'Ż': 'z', 'ż': 'z', 'Ž': 'z', 'ž': 'z', '–': '-', '—': '-'}

var tokenizer = function (s) {
  return s.replace(/[^A-Za-z0-9!"&'(),..\/:_~-]/g, function (c) {
    return map[c] || c;
  }).split(/[\s\/-]+/);
}

function start() {
  var url = $('#url').val();

  if (url) {
    $('#loading').css('visibility', 'visible').html('<img src="img/ajax-loader.gif" width="16" height="16" alt=""> Loading OCD-IDs…');

    $('#typeahead').typeahead('destroy');

    // @see https://github.com/twitter/typeahead.js/blob/master/doc/bloodhound.md
    var engine = new Bloodhound({
      limit: 10,
      datumTokenizer: function (datum) {
        return tokenizer(datum.name);
      },
      queryTokenizer: tokenizer,
      prefetch: {
        url: 'http://jsonpdataproxy.appspot.com/?format=json&encoding=utf-8&max-results=40000&url=' + url,
        filter: function (data) {
          return $.map($.grep(data.data, function (row) {
            return url != 'https://raw.githubusercontent.com/opencivicdata/ocd-division-ids/master/identifiers/country-ca.csv' || !/\/place:/.test(row[0]);
          }), function (row) {
            return {id: row[0], name: row[1]};
          });
        }
      }
    });

    engine.initialize().done(function () {
      $('#loading').css('visibility', 'hidden');

      $('#typeahead').typeahead({
        autoselect: true,
        highlight: true
      }, {
        displayKey: 'name',
        source: engine.ttAdapter(),
        templates: {
          suggestion: Handlebars.compile('<p><span class="name">{{name}}</span><span class="id">{{id}}</span></p>')
        }
      });

      $('#typeahead').bind('typeahead:opened', function (event, datum, name) {
        $('#identifier').val('');
      });
      $('#typeahead').bind('typeahead:selected', function (event, datum, name) {
        $('#identifier').val(datum.id).focus().select();
      });
    });
  }
}

$('#url').change(start);

start();
