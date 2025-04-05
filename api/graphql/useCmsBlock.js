export default async function useCmsBlock(block, blockId) {
  const backEndUrl = 'https://master-7rqtwti-jriyveajv3sxu.eu-4.magentosite.cloud/graphql'; // Magento backend URL. TODO: get from config.
  const graphqlQuery = `
  {
    cmsBlocks(identifiers: ["${blockId}"]) {
      items {
        content
      }
    }
  }`;

  function decodeHtml(encodedStr) {
    const parser = document.createElement('textarea');
    parser.innerHTML = encodedStr;
    return parser.value;
  }

  fetch(backEndUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
          // 'Authorization': 'Bearer <your_token>' // Auth token here.
      },
      body: JSON.stringify({ query: graphqlQuery })
  })
  .then(response => response.json())
  .then(data => {
      const items = data?.data?.cmsBlocks?.items;
      if (items && items.length > 0) {
          const decodedContent = decodeHtml(items[0].content);
          block.innerHTML = decodedContent;
      } else {
          block.innerHTML = '<p>CMS block content not found.</p>';
      }
  })
  .catch(error => console.error('GraphQL Error:', error));

}
