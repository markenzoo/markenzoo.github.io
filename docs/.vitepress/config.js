module.exports = {
  lang: "de-DE",
  title: "Today I Learned",
  // prettier-ignore
  description: "Dokumentation, Grundlagen und interessante Informationen rund um die Web Entwicklung",
  themeConfig: {
    repo: "vuejs/vitepress",
    docsDir: "docs",

    editLinks: true,
    editLinkText: "Jetzt auf GitHub bearbeiten",
    lastUpdated: "Zuletzt Aktualisiert",

    nav: [{ text: "E-Mail", link: "mailto:kaestner@markenzoo.de" }],

    sidebar: [
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
};
