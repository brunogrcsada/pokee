describe("Smoke Test", () => {
  it("should append two strings together", () => {
    expect("hello" + " world").toBe("hello world");
    expect("think " + " different").toBe("think  different");
  });
});
