'use strict';
{
  /*change articles in main by clicking in links in left aside*/
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

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
    console.log(activePost);

    /* [DONE] add class 'active' to the correct article */
    activePost.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';


  const generateTitleLinks = function(){

    /*[DONE]remove list from element*/
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /*[DONE]create list of articles */
    const articles = document.querySelectorAll(optArticleSelector);
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

  generateTitleLinks();

  const generateTags = () =>{
  /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);

    /* START LOOP: for every article: */
    /* find tags wrapper */
    for (let article of articles){
      let tagHtml = '';
      const dataTag = article.getAttribute('data-tags');
      const arrayTags = dataTag.split(' ');
      for (let arrayTag of arrayTags){
        tagHtml += '<li><a href="#">' + arrayTag + '</a></li>';
      }
      console.log(tagHtml);


    }

    /* make html variable with empty string */

    /* get tags from data-tags attribute */

    /* split tags into array */

    /* START LOOP: for each tag */

    /* generate HTML of the link */

    /* add generated code to html variable */

    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */

    /* END LOOP: for every article: */
  };

  generateTags();
}
