import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const imageLinksArr = [];
  const ul = document.createElement('ul');
  // const metaConfigsAttrNames = []; ////

  // create ul and banner item styles, get image links
  [...block.children].forEach((row, i) => {
    const li = document.createElement('li');
    const bannerItem = document.createElement('div');

    // TO DO: get the config values for adding font styles and alignment from
    // document-authoring endpoint configSlide1, configSlide2, etc
    const metaConfigsAttrName = row.dataset.configslide + (i + 1);
    // const metaConfigArr = row.getAttribute(metaConfigsAttrName);
    console.log('metaConfigsAttrName: ', metaConfigsAttrName)
    // metaConfigsAttrNames.push("data-configslide" + (i + 1));
    // console.log('metaConfigsAttrNames : ', metaConfigsAttrNames)
    // metaConfigsAttrNames.forEach(i => console.log('ATTR: ', row.getAttribute(i)))

    while (row.firstElementChild) li.append(row.firstElementChild);
    // add numbered classname to target specific slides with css
    li.className = 'slide_' + (i + 1);
    bannerItem.className = "banner-item-wrapper";

    [...li.children].forEach((div) => {
      let img = div.querySelector('img');

      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'banner-image';
        imageLinksArr.push(img.src);
        bannerItem.appendChild(div);
      }
      else {
        div.className = 'banner-content';
        bannerItem.appendChild(div);
      }
    });
    li.append(bannerItem)
    ul.append(li);
  });
  block.textContent = '';
  block.append(ul);

  // create slider nav buttons
  const sliderNavPrev = document.createElement('button');
  sliderNavPrev.setAttribute('id', 'sliderNavPrevious');
  sliderNavPrev.setAttribute('type', 'button');
  const sliderNavNext = document.createElement('button');
  sliderNavNext.setAttribute('id', 'sliderNavNext');
  sliderNavNext.setAttribute('type', 'button');
  block.append(sliderNavPrev);
  block.append(sliderNavNext);

  // optimize images and picture tags
  block.querySelectorAll('img').forEach((img) => {
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '800' }]));
  });

  // TO DO: get banner text content and add it to img.alt
  [...block.children].forEach((row) => {
    const textContentArr = row.querySelectorAll('.banner-slider p:first-child');
    textContentArr.forEach((textContent => {
      console.log('textContent : ', textContent.textContent)

    }));
  });

  console.log('BLOCK children : ', block.children);
  console.log('imageLinksArr: ' + imageLinksArr) ////

  // banner slider functionality
  const slider = document.querySelector('.banner-slider ul');
  const slides = slider.querySelectorAll('li');
  const slidesCount = imageLinksArr.length;
  let bannerSliderContainer = block;
  let activeSlide = 0;

  // make first slide always visible on page load
  if (activeSlide === 0) {
    slides[0].style.display = 'block';
  }
  // auto change slides every xxxx miliseconds
  // pause slides on mouse hover
  function autoSlide() {
    slides[activeSlide].style.display = 'none';
    activeSlide++;
    if (activeSlide === slidesCount) {
      activeSlide = 0;
    }
    slides[activeSlide].style.display = 'block';
  }
  let autoSlideInterval = setInterval(() => {
    autoSlide()
  }, 4000);
  bannerSliderContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });
  bannerSliderContainer.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
      autoSlide()
    }, 4000);
  });

  // handle slider nav buttons prev and next actions
  sliderNavPrev.addEventListener('click', (e) => {
    // console.log('activeSlide : ', activeSlide)
    if (activeSlide === 0) {
      slides[activeSlide].style.display = 'none';
      activeSlide = slidesCount - 1;
      slides[activeSlide].style.display = 'block';
    } else {
      slides[activeSlide].style.display = 'none';
      activeSlide--;
      slides[activeSlide].style.display = 'block';
    }
  });

  sliderNavNext.addEventListener('click', (e) => {
    autoSlide()
  });

}
