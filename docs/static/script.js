function getReportType() {
  return window.innerWidth >= 1024 ? 'desktop' : 'mobile';
}

function onReportLoad() {
  document.querySelector('.footer-stripe').hidden = true;
}

function getReportUrl(type) {
  var embedReports = {
    desktop: 'eyJrIjoiOGZkYTQxNzEtMmIyNC00ZjdlLTg2MDYtOTVjM2E5YjVjNmFmIiwidCI6IjY3Y2YyMDkyLTc4ZWEtNDhjNC05YWZiLTJlM2JlNzZjYjAxYyIsImMiOjl9',
    mobile: 'eyJrIjoiMDJkMmEyMDEtMmZlOS00YzE2LWFhMmYtMmZmODI2ZjMxMWNmIiwidCI6IjY3Y2YyMDkyLTc4ZWEtNDhjNC05YWZiLTJlM2JlNzZjYjAxYyIsImMiOjl9'
  };
  return 'https://app.powerbi.com/view?r=' + embedReports[type];
}

function setReportUrl(reportUrl) {
  var iframe = document.querySelector('.power-bi');
  iframe.setAttribute('src', reportUrl);
}

window.addEventListener('resize', function() {
  var reportUrl = getReportUrl(getReportType());
  if (window.reportUrl !== reportUrl) {
    window.reportUrl = reportUrl;
    setReportUrl(window.reportUrl);
  }
});

(function() {
  window.reportUrl = getReportUrl(getReportType());
  setReportUrl(window.reportUrl);
})();
