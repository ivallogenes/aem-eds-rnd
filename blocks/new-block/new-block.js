import { readBlockConfig } from '../../scripts/aem.js';

export default async function decorate(block) {
 const config = readBlockConfig(block);
 const { config1, config2 } = config;

 console.log('block config: ' + config1);

 console.log(block.classList.contains('varianta') ? "Variant A" : "Default variant");

 console.log('This is the new-block JS file');
}
