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
    console.log(hrefAtribute);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const activePost = document.getElementById(hrefAtribute);

    /* [DONE] add class 'active' to the correct article */
    activePost.classList.add('active');
  };

  const generateTitleLinks = function (customSelector = '') {

    /*[DONE]remove list from element*/
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /*[DONE]create list of articles */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';

    /*[DONE]iterates on list of articles to create html code & add it to variables 'let = html' */
    for (let article of articles){
      const articleId = article.getAttribute('id');
      const artTitle = article.querySelector(optTitleSelector).innerHTML;
      const linkHTML = '<li><a href="' + articleId + '"><span>' + artTitle + '</span></a></li>';
      html += linkHTML;
    }

    /*[DONE]add created html code to titleList */
    titleList.innerHTML = html;

    /*[DONE]add listeners to created titlelist */
    const links = document.querySelectorAll('.titles a');
    console.log(links);

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };

  const generateTags = () =>{
  /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles){
      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */
      let tagHtml = '';

      /* get tags from data-tags attribute */
      const dataTag = article.getAttribute('data-tags');

      /* split tags into array */
      const articleTagsArray = dataTag.split(' ');

      /* START LOOP: for each tag */
      for (let articleTag of articleTagsArray){
        /* generate HTML of the link */
        /* add generated code to html variable */
        tagHtml += '<li><a href="tag-'+ articleTag+'">' + articleTag + '</a></li>';
      }
      /* END LOOP: for each tag */

      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = tagHtml;
      console.log(tagsWrapper.innerHTML);

      /* END LOOP: for every article: */
    }
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
    console.log(activeLinks);

    /* START LOOP: for each active tag link */
    for (let activeLink of activeLinks){

      /* remove class active */
      activeLink.classList.remove('active');
    }
    /* END LOOP: for each active tag link */

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagsHref = document.querySelectorAll('[href="' + hrefAtribute + '"]');
    console.log(tagsHref);

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
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles){
      /* find tags wrapper */
      const authorWrapper = article.querySelector(optAtticleAuthorSelector);
      console.log(authorWrapper);

      /* get author href from data-author attribute */
      const dataAuthorHref = article.getAttribute('data-author');
      console.log(dataAuthorHref);

      /*get author from author href*/
      const dataAuthor = dataAuthorHref.replace('-', ' ');
      console.log(dataAuthor);

      /* generate HTML of the authorWrapper to variable html*/
      const authorHtml = '<li><a href=author-'+dataAuthorHref+'>'+dataAuthor+'</a></li>';
      console.log(authorHtml);

      /* insert HTML of all the authors into the author wrapper */
      authorWrapper.innerHTML = authorHtml;
      console.log(authorWrapper);

      /* END LOOP: for every article: */
    }
  };
  const authorClickHandler = function (event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement  = this;
    console.log(clickedElement);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const hrefAuthor = clickedElement.getAttribute('href');
    console.log('href from clicked element '+hrefAuthor);

    /* make a new constant "author" and extract tag from the "href" constant */
    const author = hrefAuthor.substring(7);

    /* find all links in main with class active */
    const activeLinks = document.querySelectorAll('main a.active' );
    console.log(activeLinks);


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

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optAtticleAuthorSelector = '.post-author .list';


  generateTitleLinks();
  generateTags();
  addClickListenersToTags();
  generateAuthors();
  addClickListenersToAuthors();
}
