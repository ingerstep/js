import { svgPreloaderMain } from "./svg.js";

export const createPrelodaer = () => {
  const preloaderBlock = document.createElement('div');
  const preloaderCircle = document.createElement('span');

  preloaderBlock.classList.add('preloader');
  preloaderCircle.id = 'loader';

  preloaderCircle.innerHTML = svgPreloaderMain;

  preloaderBlock.append(preloaderCircle);

  return preloaderBlock;
};
