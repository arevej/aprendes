const BASE_URL = 'https://od-api.oxforddictionaries.com/api/v1';
const APP_ID = 'c7bddc49';
const APP_KEY = '38fa2ea8c2cfb475eb36b27fb8e43197';

export function getInfinitive(word) {
  const url = BASE_URL + '/inflections/es/' + word;
  return fetch(url, {
    headers: {
      app_id: APP_ID,
      app_key: APP_KEY,
    },
  })
    .then(x => x.json())
    .then(data => {
      const result = data.results[0];
      if (result == null) return [];
      const verbEntry = result.lexicalEntries.find(
        entry => entry.lexicalCategory === 'Verb',
      );
      if (verbEntry == null) return [];
      return verbEntry.inflectionOf.map(inf => inf.text);
    });
}
