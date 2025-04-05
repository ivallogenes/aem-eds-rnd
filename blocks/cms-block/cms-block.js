import { readBlockConfig } from '../../scripts/aem.js';
import useCmsBlock from '../../api/graphql/useCmsBlock.js';

// POC for fetching CMS block content from remote Magento backend
// using GraphQL. The blockId is passed as a config value to the block element from the document-authoring endpoint.
// Of course this causes CORS error, so this also needs to be handled on the remote server.
export default async function decorate(block) {
  const config = readBlockConfig(block);
  const { blockid } = config;

  useCmsBlock(block, blockid);

  try {
    const h2 = document.createElement('h2');
    h2.textContent = 'This cms block is fetched from remote Magento backend using GraphQL';
    setTimeout(() => {
      const cmsContent = document.querySelector('.test-cms-block');
      cmsContent.append(h2);
    }, 1500);
  } catch (error) {
    console.error('.test-cms-block not ready. ', error);
  }

  console.log('cms-block config: ', blockid);
  console.log('cms-block : ', block);

  //  [...block.children].forEach((row, i) => {
  //   console.log('row: ' + row + ' Number of rows: ' + i)
  //  });

}
