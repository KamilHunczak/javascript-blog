'use strict';
{
  const titleClickHandler = (event) => {
    event.preventDefault();
    const clickedElement = event.currentTarget;

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const hrefAtribute = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const activePost = document.getElementById(hrefAtribute);

    /* [DONE] add class 'active' to the correct article */
    activePost.classList.add('active');
  };

  const generateTitleLinks = function (customSelector = '') {

    /*[DONE]remove list from element*/
    const titleList = document.querySelector(select.listOf.titles);
    titleList.innerHTML = '';

    /*[DONE]create list of articles */
    const articles = document.querySelectorAll(select.all.articles + customSelector);
    let html = '';

    /*[DONE]iterates on list of articles to create html code & add it to variables 'let = html' */
    for (let article of articles){
      const articleId = article.getAttribute('id');
      const artTitle = article.querySelector(select.article.titles).innerHTML;
      const linkHTML = '<li><a href="' + articleId + '"><span>' + artTitle + '</span></a></li>';
      html += linkHTML;
    }

    /*[DONE]add created html code to titleList */
    titleList.innerHTML = html;

    /*[DONE]add listeners to created titlelist */
    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };

  const calculateTagsParams = function (tags){

    // MY IDEA:
    // const values = Object.values(tags);
    // const min = Math.min(...values);
    // const max = Math.max(...values);
    // return {min, max};

    const params = {min:9999, max:0};

    for (let tag in tags){
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }
    return params;


    // SHORT IF
    // const params = {min:999999, max:0};
    // for (let tag in tags){
    //   params.max = params.max > tags[tag] ? params.max : tags[tag];
    //   params.min = params.min < tags[tag] ? params.min : tags[tag];

    // }
    // return params;


    // LOOP FOR IN
    // const params = {min: 999999, max: 0};
    // for (let tag in tags){
    //   if (tags[tag] < params.min) {
    //     params.min = tags[tag];
    //   }
    //   if(tags[tag] > params.max){
    //     params.max = tags[tag];
    //   }
    // }
    // return params;
  };

  const calculateTagClass = function(count, params){
    /*calculate difference between params max & params min */
    const rangePossibleReapeat = params.max - params.min;

    /*calculate count minus minimum params */
    const numerator = count - params.min;

    /*calculate scope of class tag number */
    const result = numerator/rangePossibleReapeat * (opts.tagSizes.count - 1)+ 1;
    return Math.round(result);
  };



  const generateTags = () =>{
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(select.all.articles);

    /* START LOOP: for every article: */
    for (let article of articles){
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(select.article.tags);

      /* make html variable with empty string */
      let tagHtml = '';

      /* get tags from data-tags attribute */
      const dataTag = article.getAttribute('data-tags');

      /* split tags into array */
      const articleTagsArray = dataTag.split(' ');

      /* START LOOP: for each tag */
      for (let articleTag of articleTagsArray){
        /* generate HTML of the link */
        const linkHTML = '<li><a href="tag-'+ articleTag+'">' + articleTag + '</a></li>';
        /* add generated code to html variable */
        tagHtml += linkHTML;

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[articleTag]) {
          /* [NEW] add tag to allTags object */
          allTags[articleTag] = 1;
        } else {
          allTags[articleTag]++;
        }
        /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = tagHtml;

      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(select.listOf.tags);

    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';
    const tagsParams = calculateTagsParams(allTags);



    /* [NEW] START LOOP: for each tag in allTags: */

    for (let articleTag in allTags){

      const tagClasses = calculateTagClass(allTags[articleTag],tagsParams);

      /* [NEW] generate code of a link and add it to allTagsHTML */
      allTagsHTML += '<li><a class ="'+ opts.tagSizes.prefix + tagClasses+'"href="tag-'+articleTag+'">'+ articleTag+'</a></li>';
    }


    tagList.innerHTML = allTagsHTML;

  };




  const tagClickHandler = function (event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement  = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const hrefAtribute = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = hrefAtribute.substring(4);

    /* find all links in main with class active */
    const activeLinks = document.querySelectorAll('main a.active' );

    /* START LOOP: for each active tag link */
    for (let activeLink of activeLinks){

      /* remove class active */
      activeLink.classList.remove('active');
    }
    /* END LOOP: for each active tag link */

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagsHref = document.querySelectorAll('[href="' + hrefAtribute + '"]');

    /* START LOOP: for each found tag link */
    for (let tagHref of tagsHref){
      /* add class active */
      tagHref.classList.add('active');
    }
    /* END LOOP: for each found tag link */

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags ~="'+tag+'"]');
  };


  const addClickListenersToTags = ()=>{
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^=tag-');

    /* START LOOP: for each link */
    for (let tagLink of tagLinks){
      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
    }
    /* END LOOP: for each link */
  };


  const generateAuthors = () => {
    /* [NEW] create a new variable allAuthors with an empty object */
    const allAuthors = {};


    /* find all articles */
    const articles = document.querySelectorAll(select.all.articles);

    /* START LOOP: for every article: */
    for (let article of articles){
      /* find tags wrapper */
      const authorWrapper = article.querySelector(select.article.authors);

      /* get author href from data-author attribute */
      const dataAuthorHref = article.getAttribute('data-author');

      /*get author from author href*/
      const dataAuthor = dataAuthorHref.replace('-', ' ');

      /* generate HTML of the authorWrapper to variable html*/
      const authorHtml = '<li><a href=author-'+dataAuthorHref+'>'+dataAuthor+'</a></li>';

      /* insert HTML of all the authors into the author wrapper */
      authorWrapper.innerHTML = authorHtml;

      /* [NEW] check if this author is NOT already in allAuthors */
      if(!allAuthors[dataAuthor]) {
        /* [NEW] add author to allAuthors object */
        allAuthors[dataAuthor] = 1;
      } else {
        allAuthors[dataAuthor]++;
      }
      /* END LOOP: for every article: */
    }
    /*[NEW] Create empty variable for innerHTML content with author list*/
    let authorListHTMLLinks = '';

    /*[NEW] Start loop for every author in allAuthors*/
    for (let author in allAuthors){

      const authorData = author.replace(' ', '-');

      /*[NEW] create link for author list in right sidebar */
      const authorListHtmlLink = '<li><a href=author-'+authorData+'>'+author+'</a>('+allAuthors[author]+')</li>';

      /*[NEW] Create author list inner HTML code*/
      authorListHTMLLinks += authorListHtmlLink;
    }
    /*[NEW]  find author list in right sidebar*/
    const authorList = document.querySelector(select.listOf.authors);

    /*[NEW] put author list links into right sidebar */
    authorList.innerHTML = authorListHTMLLinks;
  };

  const authorClickHandler = function (event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement  = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const hrefAuthor = clickedElement.getAttribute('href');

    /* make a new constant "author" and extract author from the "href" constant */
    const author = hrefAuthor.substring(7);

    /* find all links in main with class active */
    const activeLinks = document.querySelectorAll('main a.active' );


    /* START LOOP: for each active tag link */
    for (let activeAuthor of activeLinks){
      /* remove class active */
      activeAuthor.classList.remove('active');
    }
    /* END LOOP: for each active tag link */

    /* find all author links with "href" attribute equal to the "href" constant */
    const targetAuthors = document.querySelectorAll('a[href='+hrefAuthor+']');

    /* START LOOP: for each found tag link */
    for (let targetAuthor of targetAuthors){

      /* add class active */
      targetAuthor.classList.add('active');
    }
    /* END LOOP: for each found tag link */

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author='+author+']');
  };

  const addClickListenersToAuthors = ()=>{
    /* find all links to tags */
    const authorLinks = document.querySelectorAll('a[href^=author-');

    /* START LOOP: for each link */
    for (let authorLink of authorLinks){
      /* add tagClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);
    }
    /* END LOOP: for each link */
  };

  const opts = {
    tagSizes:{
      count : 5,
      prefix : 'tag-size-',
    },
  };

  const select = {
    all:{
      articles: '.post',
    },
    article: {
      titles: '.post-title',
      tags: '.post-tags .list',
      authors: '.post-author .list',
    },
    listOf: {
      titles : '.titles',
      authors : '.list.authors',
      tags : '.tags.list',
    }
  };

  generateTitleLinks();
  generateTags();
  addClickListenersToTags();
  generateAuthors();
  addClickListenersToAuthors();
}
