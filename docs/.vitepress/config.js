module.exports = {
  lang: "de-DE",
  title: "Today I Learned",
  // prettier-ignore
  description: "Dokumentation, Grundlagen und interessante Informationen rund um die Web Entwicklung",
  themeConfig: {
    repo: "markenzoo/Today-I-Learned",
    docsDir: "docs",

    base: "/",

    editLinks: true,
    editLinkText: "Jetzt auf GitHub bearbeiten",
    lastUpdated: "Zuletzt Aktualisiert",

    nav: [{ text: "E-Mail", link: "mailto:kaestner@markenzoo.de" }],

    sidebar: [
      {
        text: "Contao",
        children: [
      {
        text: "Einleitung",
        link: "/introduction",
      },
      {
        text: "Einsteiger",
        children: [{ text: "Contao Installation umziehen", link: "/deployment" }],
      },
      {
        text: "Fortgeschritten",
        children: [
          { text: "Eigene Insert-tags", link: "/custom-insert-tags" },
          { text: "Eigener CLI-Kommando", link: "/custom-symfony-command" },
        ],
      },
      ],
      },
      {
        text: "Today I Learned",
        children: [
          {text: "Beitrag erstellen", link: "/create"},
          {text: "Deployment", link: "/til-deployment"},
      ],
      },
    ],
  },
};
