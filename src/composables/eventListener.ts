import { onBeforeUnmount, onMounted } from "vue";

export const useEventListener = (
  listeners: Array<{
    event: keyof DocumentEventMap;
    cb: (e: Event) => void;
    when: "mounted" | "unmounted" | "both";
  }>
) => {
  onMounted(() => {
    listeners.forEach((listener) => {
      if (listener.when === "mounted" || listener.when === "both") {
        document.addEventListener(listener.event, listener.cb);
      }
    });
  });

  onBeforeUnmount(() => {
    listeners.forEach((listener) => {
      if (listener.when === "unmounted" || listener.when === "both") {
        document.removeEventListener(listener.event, listener.cb);
      }
    });
  });
};
