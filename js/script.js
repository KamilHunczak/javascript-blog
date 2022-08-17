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
    const hrefAtribute = clickedElement.getAttribute("href");
    console.log(hrefAtribute);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    // const activePosts = document.querySelectorAll('#' + hrefAtribute);
    const activePost = document.getElementById(hrefAtribute);
    console.log(activePost);

    /* [DONE] add class 'active' to the correct article */
    activePost.classList.add('active');

  }

const optArticleSelector = '.post',
optTitleSelector = '.post-title',
optTitleListSelector = '.titles';


const generateTitleLinks = function(){
/*remove list from element*/
const titleList = document.querySelector(optTitleListSelector);
titleList.innerHTML = "";

/*create list of articles */
const articles = document.querySelectorAll(optArticleSelector);

let html = '';

/*iterates on list of articles to create html code & add it to variables 'let = html' */
for (let article of articles){
const articleId = article.getAttribute("id");
const artTitle = article.querySelector(optTitleSelector).innerHTML;
const linkHTML = '<li><a href="' + articleId + '"><span>' + artTitle + '</span></a></li>';
html += linkHTML;
}

/*add created html code to titleList */
titleList.innerHTML = html;

/*add listeners to created titlelist */
const links = document.querySelectorAll('.titles a');
console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();
}