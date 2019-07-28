# Microsoft MVPs Monitor

> Have you ever wondered how many MVPs in specific categories and countries right now? Interested in MVP nominations' historical trends?

The project collects information about active Microsoft Most Valuable Professionals from [official MVP web site](https://mvp.microsoft.com), and provides up-to-date and easy accessible statistics.

Anonymous MVP stats, such as nominations in contribution areas and geography, is saved for historical purposes and exposed via publicly published Power BI report(s).

![MVP Monitor](./assets/mvp-monitor-promo.png)

Have an idea of a metric to add? Please create an issue request.

## How it works

![Flow](./assets/how-it-works.png)

1. Node.js job scraps MVP site on schedule basis
2. Structured data is dumped to SharePoint list as JSON document
3. JSON is processed and used with Power BI
4. Reports are published to web and used on a static site hosted in GitHub pages
