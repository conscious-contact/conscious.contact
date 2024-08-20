const { algoliasearch, instantsearch } = window;

const searchClient = algoliasearch(
  'YSVDXPEVLA',
  'e34fb09cc49087a338978ce4efcbd70f'
);

const search = instantsearch({
  indexName: 'literature',
  searchClient,
});

const customHits = instantsearch.connectors.connectHits(
  (renderOptions, isFirstRender) => {
    const { results, widgetParams } = renderOptions;
    const { container } = widgetParams;

    container.innerHTML = 
      `<div class="ais-Hits">
        <ol class="ais-Hits-list">
          ${results.hits.map(item => 
            `<li class="ais-Hits-item">
              <h2>${item.Book} - ${item.Section}</h2>
              <h3>Page ${item.Page}</h3>
              <div>
                ${instantsearch.highlight({ attribute: 'Content', hit: item })}
              </div>
            </li>`
            )
            .join('')}
        </ol>
      </div>`
  }
);

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  // instantsearch.widgets.hits({
  //   container: '#hits',
  //   templates: {
  //     item: `
  //       <h2>{{Book}} - {{Section}}</h2>
  //       <h3>Page {{Page}}</h3>
  //       <div>
  //       {{#helpers.highlight}}{ "attribute": "Content" }{{/helpers.highlight}}
  //       </div>
  //     `,
  //     empty: `
  //       <div>
  //         <p> No results found for {{query}}.</p>
  //         <a role="button" href=".">Clear all filters</a>
  //       </div>
  //     `
  //   }
  // }),
  instantsearch.widgets.configure({
    hitsPerPage: 10,
  }),
  instantsearch.widgets.refinementList({
    container: '#refinement',
    attribute: 'Book'
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
  customHits({
    container: document.querySelector('#hits'),
  })
]);

try {
  search.start();
} catch (error) {
  console.log('Algolia start error', error);
}