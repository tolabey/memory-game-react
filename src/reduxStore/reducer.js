import I from "immutable";

export function reducer(store = I.Map(), action) {
  switch(action.type) {
    case "TEST":
      return store.set("test", store.get("test", 0) + 1);
    default:
      return store;
  }
}
