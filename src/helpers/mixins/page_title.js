var baseName = "EpisodeFever";

module.exports = {
  setPageTitle: function () {
    if (this.pageTitle) {
      document.title = this.pageTitle + " | " + baseName;
    } else {
      document.title = baseName;
    }
  },

  componentDidMount: function () {
    this.setPageTitle();
  },

  changePageTitle: function (title) {
    this.pageTitle = title;
    this.setPageTitle();
  }
};
