import { expect, test } from "@playwright/test";

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === testInfo.expectedStatus) return;
  const snapshot = await page.locator("body").innerText().catch(() => "(body unavailable)");
  console.log(`[E2E diagnostic] browser=${testInfo.project.name} url=${page.url()} body=${snapshot.slice(0, 1800)}`);
});

test("ホームから30日間のレッスン一覧へ移動し、戻るでホームに戻れる", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "30日間のレッスン一覧を見る" }).click();
  await expect(page.getByRole("heading", { name: "30日間のレッスン" })).toBeVisible();
  await expect(page.getByRole("button", { name: /Day 30/ })).toBeVisible();
  await page.getByRole("button", { name: /戻る/ }).click();
  await expect(page.getByRole("heading", { name: "今日の一歩" })).toBeVisible();
});

test("Day 2の解説から練習・まとめ・完了まで進める", async ({ page }) => {
  await page.goto("/course", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Day 2、/ }).click();
  await expect(page.getByRole("heading", { name: "be動詞 am / are / is" })).toBeVisible();
  await page.getByRole("button", { name: "3問の練習へ進む" }).click();
  await page.getByRole("button", { name: "am", exact: true }).click();
  await page.getByRole("button", { name: "次の問題へ" }).click();
  await page.getByRole("button", { name: "私はうれしいです。" }).click();
  await page.getByRole("button", { name: "次の問題へ" }).click();
  await page.getByRole("button", { name: /I と am、you/ }).click();
  await page.getByRole("button", { name: "練習結果を見る" }).click();
  await page.getByRole("button", { name: "まとめへ進む" }).click();
  await page.getByRole("button", { name: "Day 2を完了する" }).click();
  await expect(page.getByRole("button", { name: /Day 2、.*完了済み/ })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("button", { name: /Day 2、.*完了済み/ })).toBeVisible();
});
