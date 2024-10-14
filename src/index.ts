/** Polyfills */
import { Buffer } from "buffer";
import EventEmitter from "events";

declare global {
  interface Window {
    Buffer: typeof Buffer;
    EventEmitter: typeof EventEmitter;
  }
}

// Check if we are on browser
if (typeof window !== "undefined") {
  window.Buffer = Buffer;
  window.EventEmitter = EventEmitter;
}

/** Exports */
export * from "./clients";
export * from "./configs";
export * as consts from "./helpers/index";
