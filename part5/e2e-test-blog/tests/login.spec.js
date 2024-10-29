// Create a new npm project for tests and configure Playwright there.
// Make a test to ensure that the application displays the login form by default.

const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // empty the db here
    await request.post('http://localhost:3003/api/testing/reset')

    // create a user for the backend here
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'testpassword',
      }
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
      const lusername = await page.locator('input[name="Username"]')
      const lpassword = await page.locator('input[name="Password"]')
      const lloginButton = await page.getByRole('button', { name: 'login' })

      await lusername.fill('testuser')
      await lpassword.fill('testpassword')
      await lloginButton.click()

      await expect(await page.getByText(`Test User logged in`)).toBeVisible()
    })
    
    test('fails with wrong credentials', async ({ page }) => {
      const lusername = await page.locator('input[name="Username"]')
      const lpassword = await page.locator('input[name="Password"]')
      const lloginButton = await page.getByRole('button', { name: 'login' })
  
      await lusername.fill('wronguser')
      await lpassword.fill('wrongpassword')
      await lloginButton.click()

      const lfailedLogin =await page.locator('.notification.error').getByText('Wrong credentials')

      await expect(lfailedLogin).toBeVisible()
    })
  })
})
