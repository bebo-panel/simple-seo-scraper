const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://seoriented.it/seo-copywriting/";

async function scrapeWebsite(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const metaDescription = new Set();
    const metaTitle = new Set();
    const altAttributesSet = new Set();
    const hrefTitlesSet = new Set();
    const hrefSlugsSet = new Set();
    const strongContentsSet = new Set();
    const boldContentsSet = new Set();
    const h1ContentsSet = new Set();
    const h2ContentsSet = new Set();
    const h3ContentsSet = new Set();
    const h4ContentsSet = new Set();
    const h5ContentsSet = new Set();

    $("head meta[name='description']").each((index, element) => {
      const attributes = element.attribs;
      const attributesString = JSON.stringify(attributes);
      metaDescription.add(attributesString);
    });
    const description = Array.from(metaDescription).map((tag) =>
      JSON.parse(tag)
    );

    $("head title").each((index, element) => {
      const titleText = $(element).text();
      metaTitle.add(titleText);
    });
    const TabTitle = Array.from(metaTitle);

    $("img").each((index, element) => {
      const alt = $(element).attr("alt");
      if (alt) {
        altAttributesSet.add(alt);
      }
    });
    const altAttributes = Array.from(altAttributesSet);

    $("a").each((index, element) => {
      const title = $(element).attr("title");
      if (title) {
        hrefTitlesSet.add(title);
      }
    });
    const hrefTitles = Array.from(hrefTitlesSet);

    $("a").each((index, element) => {
      const href = $(element).attr("href");
      if (href) {
        const slug = href.split("/").pop();
        hrefSlugsSet.add(slug);
      }
    });
    const hrefSlugs = Array.from(hrefSlugsSet);

    $("strong").each((index, element) => {
      const content = $(element).text();
      if (content) {
        strongContentsSet.add(content);
      }
    });
    const strongContents = Array.from(strongContentsSet);

    $("b").each((index, element) => {
      const content = $(element).text();
      if (content) {
        boldContentsSet.add(content);
      }
    });
    const boldContents = Array.from(boldContentsSet);

    $("h1").each((index, element) => {
      const content = $(element).text();
      if (content) {
        h1ContentsSet.add(content);
      }
    });
    const h1Contents = Array.from(h1ContentsSet);

    $("h2").each((index, element) => {
      const content = $(element).text();
      if (content) {
        h2ContentsSet.add(content);
      }
    });
    const h2Contents = Array.from(h2ContentsSet);

    $("h3").each((index, element) => {
      const content = $(element).text();
      if (content) {
        h3ContentsSet.add(content);
      }
    });
    const h3Contents = Array.from(h3ContentsSet);

    $("h4").each((index, element) => {
      const content = $(element).text();
      if (content) {
        h4ContentsSet.add(content);
      }
    });
    const h4Contents = Array.from(h4ContentsSet);

    $("h5").each((index, element) => {
      const content = $(element).text();

      if (content) {
        h5ContentsSet.add(content);
      }
    });
    const h5Contents = Array.from(h5ContentsSet);

    return {
      description,
      TabTitle,
      altAttributes,
      hrefTitles,
      hrefSlugs,
      strongContents,
      boldContents,
      h1Contents,
      h2Contents,
      h3Contents,
      h4Contents,
      h5Contents,
    };
  } catch (error) {
    console.error("Errore durante lo scraping del sito web:", error);
    throw error;
  }
}

scrapeWebsite(url)
  .then((data) => {
    console.log("Dati estratti:", data);
  })
  .catch((error) => {
    console.error("Errore:", error);
  });
