# Google Search Console setup

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add a URL-prefix property for `https://www.youssefyouyou.com`.
3. Choose **HTML tag** verification.
4. Copy only the `content` value from the verification meta tag into:

   ```env
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_google_search_console_meta_code
   ```

   Do not paste the full `<meta>` tag, and do not wrap the value in HTML.

5. Deploy the frontend with the environment variable configured.
6. Return to Search Console and click **Verify**.
7. Open **Sitemaps** and submit `https://www.youssefyouyou.com/sitemap.xml`.
8. Use **URL inspection** for the homepage and key service pages, then request indexing.

The verification tag is omitted entirely when the environment variable is missing.

