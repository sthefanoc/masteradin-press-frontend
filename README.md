[![LinkedIn][linkedin-shield]][linkedin-url] <br />
![Twitter Follow](https://img.shields.io/twitter/follow/Sthefano_C?style=social) <br />

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/sthefanocarvalho

<h1 align="center">Masteradin Press | MERN App</h1>

<p align="center">
  <img width="100%" alt="Masteradin Press Header" src="/repo/Masteradin Press - MERN App - Header.png">
</p>

Website to share press releases with different journalists. It has authentication, allows users to follow profiles and comment on articles.
Next.js + SWR.

<p align="center">
  <img width="100%" alt="Masteradin Press Preview" src="/repo/Masteradin Press - MERN App - Complete.webp">
</p>

## Getting Started

To get this running on another machine, just clone the repo and run the command to start the server. It is important to have node installed:

```
npm install
npm run dev
```

Afterwards, it is necessary to change the constants related to your project on `lib/utils/constant.js`.

### Functionality

**General functionality:**

- Authenticate users via JWT (login/register pages + logout button on settings page)
- CRU\* users (sign up & settings page - no deleting required)
- CRUD Articles
- CR\*D Comments on articles (no updating required)
- GET and display paginated lists of articles
- Favorite articles
- Follow other users

**The general page breakdown looks like this:**

- Home page (URL: /)
  - List of tags
  - List of articles pulled from either Feed, Global, or by Tag
  - Pagination for list of articles
- Sign in/Sign up pages (URL: /user/login, /user/register)
  - Use JWT (store the token in localStorage)
- Settings page (URL: /user/settings )
- Editor page to create/edit articles (URL: /editor/new, /editor/article-slug-here)
- Article page (URL: /article/article-slug-here)
  - Delete article button (only shown to article's author)
  - Render markdown from server client side
  - Comments section at bottom of page
  - Delete comment button (only shown to comment's author)
- Profile page (URL: /profile/username-here, /profile/username-here?favorite=true)
  - Show basic user info
  - List of articles populated from author's created articles or author's favorited articles

### Styles

The website is responsive. Using media-queries the app can be used on desktop or smaller screens.
Styled Components were used to organize styling for different components.

## Deployment

The app is deployed using [Netlify](https://www.netlify.com/) for the front-end, [Heroku](https://dashboard.heroku.com/app/) as back-end.
The domain is managed on the [Hostinger](https://www.hostinger.com.br/) platform.

## Built With

- [Visual Studio Code](https://code.visualstudio.com/) - The editor
- [NextJS](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [ReactJS](https://reactjs.org/)
- [NodeJS](http://nodejs.org/)

## Authors

- **Sthefano Carvalho** - [SthefanoC](https://github.com/sthefanoc)

## Acknowledgments

- Project inspired by [RealWorld codebase](https://github.com/gothinkster/realworld)
