import { expect,test } from '@playwright/test';
import { GET_BOOK } from '../../src/config/paths';
import { Book, GetBookRes } from '../../src/types/book';
import { mockBooksRes } from "../../src/data/books";
import { BookPage } from '../../src/pages/BookPage.page';
import { noBook } from '../../src/data/nobook'

test('TC005-01: API get list book', async ({ request }) => {
  const bookTitle = 'Git Pocket Guide';
  const getBooksRes = await request.get(GET_BOOK);
  expect(getBooksRes.status()).toBe(200);
  const listBookData: GetBookRes = await getBooksRes.json();
  const listBooks: Book[] = listBookData.books;
  expect(listBooks.length).toBeGreaterThan(0);
  for (const book of listBooks) {
    expect(book.isbn).toEqual(expect.any(String));
    expect(book.isbn).not.toBe("");
    expect(book.title).toEqual(expect.any(String));
    expect(book.title).not.toBe("");
    expect(book.author).toEqual(expect.any(String));
    expect(book.author).not.toBe("");
  };
  expect(listBooks.map(b => b.title)).toContain(bookTitle);
});

test("TC005-02: Verify UI and API", async ({ page, request }) => {
  const getBookRes = await request.get(GET_BOOK);
  expect(getBookRes.status()).toBe(200);
  const getBookData: GetBookRes = await getBookRes.json();
  const listBooks: Book[] = getBookData.books;
  const bookTitleAPI = listBooks.map(book => book.title);
  const bookPage = new BookPage(page);
  await bookPage.goto();
  await expect(bookPage.listBook).toHaveText(bookTitleAPI);
});

test("TC005-03: Mock data - Fake book", async ({ page }) => {
  const bookPage = new BookPage(page);
  const responsePromise = bookPage.page.waitForResponse(GET_BOOK);
  await bookPage.page.route(GET_BOOK, async route => {
    await route.fulfill({ status: 200, json: mockBooksRes });
  });
  await bookPage.goto();
  await responsePromise;
  await expect(bookPage.listBook).toHaveText(mockBooksRes.books.map(book => book.title));
});


test("TC005-04: Mock data - Not have book", async ({ page }) => {
  const textNoData = "Page 1 of 0";
  const bookPage = new BookPage(page);
  const responsePromise = bookPage.page.waitForResponse(GET_BOOK);
  await bookPage.page.route(GET_BOOK, async route => {
    await route.fulfill({ status: 200, json: noBook });
  });
  await bookPage.goto();
  await responsePromise;
  await expect(bookPage.listBook).toHaveCount(0);
  await expect(bookPage.pageInfo).toHaveText(textNoData);
});