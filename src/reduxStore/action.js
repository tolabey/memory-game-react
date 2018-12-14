import I from "immutable";

export function action(type, payload) {
  return {
    type,
    payload: I.fromJS(payload)
  };
}
