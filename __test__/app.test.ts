import app from "../src/app";
import request from "supertest";


describe("Test app.ts", () => {
  test("Catch-all route", async () => {
    const res = await request(app).get("/");
    expect(res.body).toEqual({ message: "Server is up and running", status: "success" });
  });
});
