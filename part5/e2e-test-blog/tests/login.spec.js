// Create a new npm project for tests and configure Playwright there.
// Make a test to ensure that the application displays the login form by default.

const { test, expect, beforeEach, describe } = require('@playwright/test')
const { log } = require('console')

const testBlog = {
  title: 'Test Blog',
  author: 'Test Author',
  url: 'https://example.com',
}

const testUser = {
  name: 'Test User',
  username: 'testuser',
  password: 'testpassword',
}

const createBlog = async (page, blog) => {
  await page.getByRole('button', { name: 'new blog' }).click()

  await page.locator('input[name="Title"]').fill(blog.title)
  await page.locator('input[name="Author"]').fill(blog.author)
  await page.locator('input[name="Url"]').fill(blog.url)
  await page.getByRole('button', { name: 'create' }).click()
}

const loginWith = async (page, username, password) => {
  await page.locator('input[name="Username"]').fill(username)
  await page.locator('input[name="Password"]').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // empty the db here
    await request.post('http://localhost:3003/api/testing/reset')

    // create a user for the backend here
    await request.post('http://localhost:3003/api/users', {
      data: testUser
    })

    // go to the login page
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const lusername = await page.locator('input[name="Username"]')
    const lpassword = await page.locator('input[name="Password"]')
    const lloginButton = await page.getByRole('button', { name: 'login' })

    await expect(lusername).toBeVisible()
    await expect(lpassword).toBeVisible()
    await expect(lloginButton).toBeVisible()
  })

  // Do the tests for login. Test both successful and failed login.
  // For tests, create a user in the beforeEach block.
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'testpassword')

      await expect(await page.getByText(`Test User logged in`)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'wronguser', 'wrongpassword')
      const lfailedLogin = await page.locator('.notification.error').getByText('Wrong credentials')
      await expect(lfailedLogin).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testuser', 'testpassword')
    })

    // Create a test that verifies that a logged in user can create a blog
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, testBlog)

      await expect(await page.locator('h2[class="blog-title"]').getByText('Test Blog')).toBeVisible()
      await expect(await page.locator('p[class="blog-author"]').getByText('Test Author')).toBeVisible()
      await expect(await page.getByText('https://example.com')).toBeHidden()
    })

    // Do a test that makes sure the blog can be liked
    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, testBlog)

      await page.getByRole('button', { name: 'view' }).click()

      await expect(await page.locator('.togglableContent').first().getByText('likes')).toBeVisible()

      const currentLikes = await (await page.locator('.togglableContent').first().getByText('likes 0').innerHTML()).match(/\d+/)[0]

      await page.getByRole('button', { name: 'like' }).first().click()

      const newLikes = await (await page.locator('.togglableContent').first().getByText('likes 1').innerHTML()).match(/\d+/)[0]

      expect(parseInt(newLikes)).toBe(parseInt(currentLikes) + 1)
    })

    // Make a test that ensures that the user who added the blog can delete the blog.
    test('a blog can be deleted', async ({ page }) => {
      await createBlog(page, testBlog)
      await page.getByRole('button', { name: 'view' }).click()
      await page.locator('h2[class="blog-title"]').getByText(testBlog.title).waitFor()
      page.on('dialog', dialog => {
        console.log(dialog.message())
        const dialogText = `Remove blog ${testBlog.title} by ${testBlog.author}?`
        if (dialog.message() === dialogText) {
          dialog.accept()
        }
      });
      await page.getByRole('button', { name: 'remove' }).click()

      const lblogTitle = await page.locator('h2[class="blog-title"]').getByText(testBlog.title).waitFor({ state: 'detached' })
      await expect(lblogTitle).toBeFalsy()
    })

    // Make a test that ensures that only the user who added the blog sees the blog's delete button
    test('only the user who added the blog can delete the blog', async ({ page, request }) => {
      const testUser2 = {
        name: 'Test User 2',
        username: 'testuser2',
        password: 'testpassword2',
      }

      await request.post('http://localhost:3003/api/users', {
        data: testUser2
      })

      await createBlog(page, testBlog)
      await page.getByRole('heading').getByText(testBlog.title).waitFor()

      await page.getByRole('button', { name: 'logout' }).click()
      await loginWith(page, testUser2.username, testUser2.password)

      await page.getByRole('button', { name: 'view' }).click()
      await page.locator('h2[class="blog-title"]').getByText(testBlog.title).waitFor()
      const lremoveButton = await page.getByRole('button', { name: 'remove' }).waitFor({ state: 'detached' })
      await expect(lremoveButton).toBeFalsy
    })
  })
})
