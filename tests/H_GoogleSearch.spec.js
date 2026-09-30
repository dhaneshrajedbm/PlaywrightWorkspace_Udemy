const { test, expect } = require('@playwright/test');

test('Search Google for Samsung S24 mobile phone', async ({ page }) => {
    const searchQuery = 'Samsung s24 mobile phone';

    await page.goto('https://www.google.com/');

    const searchBox = page.locator('textarea[name="q"], input[name="q"]').first();
    await searchBox.fill(searchQuery);
    const searchRequestPromise = page.waitForRequest((request) => {
        const url = new URL(request.url());
        return url.hostname === 'www.google.com'
            && url.pathname === '/search'
            && url.searchParams.get('q') === searchQuery;
    });
    await searchBox.press('Enter');

    const searchRequest = await searchRequestPromise;
    expect(new URL(searchRequest.url()).searchParams.get('q')).toBe(searchQuery);
});
