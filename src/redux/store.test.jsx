import { describe, it, expect, vi, beforeEach } from "vitest";
import { store, persistor } from "./store";
import storage from "redux-persist/lib/storage";
import productReducer from "./productSlice";

// Mock `redux-persist` with the necessary constants and methods
vi.mock("redux-persist", async () => {
  const originalModule = await vi.importActual("redux-persist");
  return {
    ...originalModule,
    persistStore: vi.fn(),
    persistReducer: vi.fn((_, reducer) => reducer),
    FLUSH: "persist/FLUSH",
    REHYDRATE: "persist/REHYDRATE",
    PAUSE: "persist/PAUSE",
    PERSIST: "persist/PERSIST",
    PURGE: "persist/PURGE",
    REGISTER: "persist/REGISTER",
  };
});

describe("Redux Store", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create a store with persisted product reducer and user reducer", () => {
    const state = store.getState();
    expect(state).toHaveProperty("product");
    expect(state).toHaveProperty("user");
  });

  // it("should call persistReducer with the correct configuration", () => {
  //   expect(persistReducer).toHaveBeenCalledWith(
  //     {
  //       key: "product",
  //       version: 1,
  //       storage,
  //     },
  //     productReducer
  //   );
  // });

  // it("should configure middleware to ignore specific actions in serializable check", () => {
  //   const middlewares = store.middleware;
  //   const ignoredActions = ["persist/FLUSH", "persist/REHYDRATE", "persist/PAUSE", "persist/PERSIST", "persist/PURGE", "persist/REGISTER"];

  //   expect(middlewares).toEqual(
  //     expect.arrayContaining([
  //       expect.objectContaining({
  //         serializableCheck: {
  //           ignoredActions: expect.arrayContaining(ignoredActions),
  //         },
  //       }),
  //     ])
  //   );
  // });

  // it("should initialize the persistor", () => {
  //   expect(vi.mocked(persistStore)).toHaveBeenCalledWith(store);
  //   expect(persistor).toBeDefined();
  // });
});
