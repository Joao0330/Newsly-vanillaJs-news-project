# Newsly - A news website

Newsly is a website made using vanilla javascript that allows the user to browse all types of news from around the world in multiple languages. All of this is possible with the use of the [News API](https://newsapi.org/)

## ⚡Getting Started

1.  Before launching the website, first, you should create an account on the [News API](https://newsapi.org/) website to have access to your API key that will be used to run the website.

2.  After registering, go to your [account page](https://newsapi.org/account) and retrive your **API KEY**.

3.  Download the source code from the repository and your folder tree structure should look like this:

```
└── 📁assets
└── 📁lib
└── 📁pages
└── 📁scripts
└── 📁styles
└── .gitignore
└── index.html
└── README.md
```

4.  Inside the `📁lib` folder, create a new file called `config.js` and inside of it put the following line:

    ```js
    export const apiKey = 'YOUR_API_KEY';
    ```

    Change the **YOUR_API_KEY** field with your actual key and save the file.

    With this, your `📁lib` folder should look like this:

```
└── 📁lib
	└── api.js
	└── config.js
	└── getCategoryFromPage.js
	└── newsContentTemplates.js
```

5.  Open the site using the `Live Server` extension or any other extension that serves the same purpose.
