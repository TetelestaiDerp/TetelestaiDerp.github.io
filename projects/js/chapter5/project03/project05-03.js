"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Project 05-03

      Project to create a table of headings from an article
      Author: 
      Date:   

      Filename: project05-03.js
*/
//declare variables used
let sourceDoc = document.getElementById("source_doc");
let toc = document.getElementById("toc");
let headingCount = 1;
// constant for heading
const heading = "H2";

for(let n = sourceDoc.firstElementChild; n != null; n = n.nextElementSibling) 
      {
      if(n.nodeName === heading) 
            {
            let anchor = document.createElement("a");
            anchor.name = "doclink" + headingCount;
            n.insertBefore(anchor, n.firstElementChild);

            let listItem = document.createElement("li");
            let link = document.createElement("a");
            link.href = "#doclink" +headingCount
            link.textContent = n.textContent;
            listItem.appendChild(link);
            toc.appendChild(listItem);
            headingCount++
      }
}
