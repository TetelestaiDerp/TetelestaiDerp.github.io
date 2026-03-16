"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Project 05-03

      Project to create a table of headings from an article
      Author: 
      Date:   

      Filename: project05-03.js
*/
document.addEventListener("DOMContentLoaded", () => {
  const sourceDoc = document.getElementById("source_doc");
  const toc = document.getElementById("toc");

  const headings = Array.from(sourceDoc.querySelectorAll("h2"));

  headings.forEach((h2, index) => {

    if (!h2.id) {
      h2.id = "h2-" + (index + 1);
    }

    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = "#" + h2.id;
    a.textContent = h2.textContent.trim();
    a.dataset.targetId = h2.id;

    li.appendChild(a);
    toc.appendChild(li);
  });

  toc.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    e.preventDefault();
    const target = document.getElementById(link.dataset.targetId);

    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 20,
      behavior: "smooth"
    });
  });

  const tocLinks = Array.from(toc.querySelectorAll("a"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = tocLinks.find(
          (a) => a.dataset.targetId === entry.target.id
        );
        if (!link) return;

        if (entry.isIntersecting) {
          tocLinks.forEach((a) => a.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    {
      root: null,
      threshold: 0.35
    }
  );

  headings.forEach((h) => observer.observe(h));
});