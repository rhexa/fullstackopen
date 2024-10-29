// Create a new npm project for tests and configure Playwright there.
// Make a test to ensure that the application displays the login form by default.

const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
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
})