module.exports = {
  logout: function () {
    $.ajax({
      url: "api/session",
      method: "delete",
      success: function (data) {
        console.log('logged_out');
      }
    });
  }
};
