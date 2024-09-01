import { readBlockConfig } from '../../scripts/aem.js';
import { createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
 const config = readBlockConfig(block);
 // "_" char is not allowed in block config names at the document-authoring end.
 // config_1 doesnt work, config-1 also causes errors.
 // Letter casing is ignored too.
 const { config1, config2 } = config;

 console.log('block config: ' + config1);

 console.log(block.classList.contains('varianta') ? "Variant A" : "Default variant");

 console.log('new-block children: ' + block.children);

 [...block.children].forEach((row, i) => {
  row.classList.add('new-block-child');

  let numberOfRows = i;
  // while (row.firstElementChild) {
  //   numberOfRows++
  // }
  row.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '800' }])));

  console.log('row: ' + row + ' Number of rows: ' + numberOfRows)
 });


}
