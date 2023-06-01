class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(key, value) {
    const newNode = new Node(key, value);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.key === node.key) {
      if (Array.isArray(node.value)) {
        node.value.push(newNode.value);
      } else {
        node.value = [node.value, newNode.value];
      }
    } else if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  search(key) {
    return this.searchNode(this.root, key);
  }

  searchNode(node, key) {
    if (node === null) {
      return null;
    }

    if (key === node.key) {
      return node.value;
    } else if (key < node.key) {
      return this.searchNode(node.left, key);
    } else {
      return this.searchNode(node.right, key);
    }
  }

  crawlWebsites(websites) {
    for (const website of websites) {
      const { name, url } = website;
      this.insert(name, url);
    }
  }
}

const bst = new BinarySearchTree();

// Alimentação automática (crawling) da árvore
const websitesToCrawl = [
  { name: "facebook", url: "www.facebook.com" },
  { name: "stackoverflow", url: "www.stackoverflow.com" },
  { name: "wikipedia", url: "www.wikipedia.org" },
  { name: "facebook", url: "www.fecebookteste.org" },
];

bst.crawlWebsites(websitesToCrawl);

function search() {
  const searchInput = document.getElementById("searchInput");
  const searchValue = searchInput.value.toLowerCase();

  const sites = bst.search(searchValue);

  if (sites) {
    let results = "";
    if (Array.isArray(sites)) {
      results = sites
        .map(
          (site) =>
            `<li style="list-style-type: none;font-size:22px;text-decoration:underline;text-decoration-color:blue;"><a class="main-link" href="http://${site}" target="_blank">${site}</a></li>`
        )
        .join("");
    } else {
      results = `<li style="list-style-type: none;font-size:22px;text-decoration:underline;color:blue;text-decoration-color:blue;"><a class="main-link" href="http://${sites}" target="_blank">${sites}</a></li>`;
    }
    document.getElementById("searchResults").innerHTML = `<ul>${results}</ul>`;
  } else {
    document.getElementById(
      "searchResults"
    ).innerHTML = `<p style="font-size:32px">${searchValue} não encontrado!</p>`;
  }
}

function addWebsite(event) {
  event.preventDefault();

  const nameInput = document.getElementById("recipient-name");
  const urlInput = document.getElementById("message-text");

  const name = nameInput.value.trim();
  const url = urlInput.value.trim();

  if (name !== "" && url !== "") {
    bst.insert(name, url);

    nameInput.value = "";
    urlInput.value = "";

    console.log("Site adicionado com sucesso!");
  } else {
    console.log("Por favor, preencha todos os campos.");
  }
}

const websiteForm = document.getElementById("websiteForm");
websiteForm.addEventListener("submit", addWebsite);
