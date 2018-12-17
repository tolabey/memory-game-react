import I from "immutable";

export function reducer(store = I.Map(), action) {
  switch(action.type) {
    case "TEST":
      return store.set("test", store.get("test", 0) + 1);
    case "LEVEL":
    case "START":
    case "IMAGELIST":
    case "TIMEINTERVAL":
      return store.set(action.type.toLowerCase(), action.payload);
    case "RESETTIMER":
      return store.set("timer", 4);
    case "TIMER": {
      if(store.get("timer") === 1) {
        clearInterval(store.get("timeinterval"));
      }
      return store.set("timer", store.get("timer", 4) - 1);

    }
    case "CHOOSEN-IMAGES":
      return store.set("choosenImages", [...store.get("choosenImages",[]), action.payload]);
    case "REMOVE-CHOOSEN-IMAGES":
      return store.delete("choosenImages");
    case "SET-SCORE":
      return store.set("score", store.get("score", 0) + action.payload);
    case "SUCCEESS-MAP":
      return store.setIn(["successMap", action.payload.get("key1")], true).setIn(["successMap", action.payload.get("key2")], true);
    case "REMOVE-SUCCEESS-MAP":
      return store.delete("successMap");
    default:
      return store;
  }
}
