'use strict';

const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */
    // alternative to talk about with Patryk:
    // const activeLink = document.querySelector('.titles a.active');
    // console.log(activeLink);
    // activeLink.classList.remove('active');

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    // alternative to talk about with Patryk:
    // const activeArticle = document.querySelector('.posts article.active');
    // activeArticle.classList.remove('active');

    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const hrefAtribute = clickedElement.getAttribute("href");

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    // alternative to talk about with Patryk:
    // const activePost = document.querySelector(hrefAtribute);
    // activePost.classList.add('active');

    const activePosts = document.querySelectorAll(hrefAtribute);

    /* [DONE] add class 'active' to the correct article */
    for(let activePost of activePosts){
      activePost.classList.add('active');
    }
  }

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
