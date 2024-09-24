// Import algoliasearch, instantsearch, instantsearch.css, and stylesheet
// import Alpine from 'alpinejs';

const APP_ID = "YSVDXPEVLA";
const SEARCH_ONLY_API_KEY = "e34fb09cc49087a338978ce4efcbd70f";
const INDEX_NAME = "literature";
const algoliaClient = algoliasearch(APP_ID, SEARCH_ONLY_API_KEY); 

const searchClient = {
  ...algoliaClient,
  search(requests) {
    if (requests.every(({params}) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
          hitsPerPage: 0,
          exhaustiveNbHits: false,
          query: '',
          params: '',
        })),
      });
    }

    return algoliaClient.search(requests);
  },
}

// Create the instantsearch instance
const search = instantsearch({
  indexName: INDEX_NAME,
  searchClient,
});

// Add widgets to the instantsearch instance
search.addWidgets([
  instantsearch.widgets.searchBox({
    container: "#searchbox",
    placeholder: "Search 12-step literature",
    searchAsYouType: false,
    autofocus: true
  }),
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      item: (hit, { html, components }) => html`
        <li class="">
          <h2 class="text-lg mb-1 font-bold">${hit.Book}, page ${hit.Page}</h2>
          <h3 class="text-xs mb-2 uppercase font-bold">${hit.Section}</h3>
          <p>${components.Highlight({ hit, attribute: "Content" })}</p>
        </li>
      `,
      // empty: ({ query }, { html }) => {
      //   const noResults = `No results found for <strong>${ query }</strong>. If you used quotes, try removing them to broaden your search.`;
      //   const instructions = `
      //     <h2 class="text-xl font-bold">How to Search</h2>
      //     <p>How to use the search feature.</p>
      //   `;
      //   return html`${ (query) ? noResults : instructions }`
      // }
    },
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 10,
  }),
  instantsearch.widgets.pagination({
    container: "#pagination",
    showFirst: false,
    showLast: false
  }),
  instantsearch.widgets.refinementList({
    container: "#refinement-list",
    attribute: "Book",
  }),
  instantsearch.widgets.currentRefinements({
    container: "#current-refinements",
  }),
  // clearRefinements({
  //   container: '#clear-refinements',
  //   cssClasses: {
  //     button: [
  //       'p-2',
  //       'rounded-full',
  //       'bg-slate-400',
  //     ],
  //     disabledButton: 'hidden',
  //   }
  // }),
]);

// Start the Alpinejs instance
// try {
//   Alpine.start();
// } catch (error) {
//   console.error('Alpinejs start error', error);
// }

// Start the instantsearch instance
try {
  search.start();
} catch (error) {
  console.error('Algolia search boot error', error);
}