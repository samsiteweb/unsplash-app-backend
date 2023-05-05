
import request from "supertest";
import crypto from "crypto";
import app from "../../src/app";


const generateRandomText = (length: number) => {
  return crypto.randomBytes(length).toString('hex');
}

describe("Test unsplash api suite", () => {
  let createdImageId: string;
  const label: string = generateRandomText(10)
  const image_url = "https://images.pexels.com/photos/5956834/pexels-photo-5956834.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
  
  let server: any;

  beforeAll(() => {
    server = app.listen(3002);
  });

  afterAll((done) => {
    server.close(done);
  });
  
  test("should create a new image", async () => {
    const res = await request(app)
      .post("/v1/unsplash")
      .send({
        image_url,
        label
      });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data.image_url).toBe(image_url);
    expect(res.body.data.label).toBe(label);
    createdImageId = res.body.data.id;
  });

  test("Returns a list of items", async () => {
    const res = await request(app).get("/v1/unsplash");
    expect(res.status).toBe(200);
    expect(res.body.status).toEqual("success");
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    const firstImage = res.body.data[0];
    expect(firstImage).toHaveProperty("id");
    expect(firstImage).toHaveProperty("image_url");
    expect(firstImage).toHaveProperty("label");
    expect(firstImage).toHaveProperty("created_at");
    expect(firstImage).toHaveProperty("updated_at");
  });

  test("should search for the created image", async () => {
    const res = await request(app).get(`/v1/unsplash/search?queryString=${encodeURIComponent(label)}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data[0].id).toBe(createdImageId);
    expect(res.body.data[0].image_url).toBe(image_url);
    expect(res.body.data[0].label).toBe(label);
  });

  test("should delete the created image", async () => {
    const res = await request(app)
      .delete(`/v1/unsplash/${createdImageId}`)
      .send({ password: process.env.DEFAULT_PASSWORD});

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data).toBe("Image deleted successfully")
  });
  
});
