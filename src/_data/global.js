module.exports = () => {
  return {
    environment: process.env.MY_ENV || 'development',
    ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID || 'latency',
    ALGOLIA_SEARCH_ONLY_API_KEY: process.env.ALGOLIA_SEARCH_ONLY_API_KEY || '6be0576ff61c053d5f9a3225e2a90f76',
    ALGOLIA_INDEX_NAME: process.env.ALGOLIA_INDEX_NAME || 'instant_search',
    ALGOLIA_REFINEMENT_ATTRIBUTE: process.env.ALGOLIA_REFINEMENT_ATTRIBUTE || 'brand',
  };
};