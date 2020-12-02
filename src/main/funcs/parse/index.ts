import {keywordMatches} from '../../utils/KeywordUtils/index'

export const parseProductFromProducts=(
  products:any,
  keyword:string
) =>{
  for (let i = 0; i < products.length; i++) {
    if (keywordMatches(products[i].name, keyword)) {
      return products[i];
    }
  }
  throw new Error(`could not find product using keyword: ${keyword}`);
};

export const parseStyleFromStyles=(
  styles:any,
  styleKeyword:string,
  sizeKeyword:string
)=>{
  for (let i = 0; i < styles.length; i++) {
    const style = styles[i];
    if (keywordMatches(style.name, styleKeyword)) {
      for (let j = 0; j < style.sizes.length; j++) {
        const size = style.sizes[j];
        if (keywordMatches(size.name, sizeKeyword)) {
          return { style, size };
        }
      }
      throw new Error(
        `could not find size ${sizeKeyword} in style: ${style.name}`
      );
    }
  }
  throw new Error(`could not find style ${styleKeyword}`);
};
