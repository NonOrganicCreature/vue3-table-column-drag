<script setup lang="ts">
import { ref } from "vue";
import { useEventListener } from "../composables/eventListener";

export type DTableCell = {
  id: number | string;
  value: string;
};

export type DTableRow = {
  id: number | string;
  value: Array<DTableCell>;
};

type Position = {
  x: number;
  y: number;
};

const emptyDataEntry: DTableCell = { id: -1, value: "" };

const draggingColumnData = ref<DTableCell>(emptyDataEntry);
const draggingRowData = ref<Array<DTableCell>>([]);

const draggingColumnWidth = ref(-1);
const draggingColumnTableIndex = ref(-1);

const mouseMoving = ref(false);

const mousePosition = ref<Position>({ x: 0, y: 0 });

const draggingColumnOffsetRelativeToMouse = {
  x: 20,
  y: 20
};

const props = defineProps<{
  columns: Array<DTableCell>;
  rows: Array<DTableRow>;
}>();

const emit = defineEmits<{
  (e: "update:columns", value: Array<DTableCell>): void;
  (e: "update:rows", value: Array<DTableRow>): void;
}>();

const onMouseDown = (e: Event) => {
  document.addEventListener("mousemove", onMouseMove);
  const target = e.currentTarget as HTMLElement;

  if (target) {
    const draggingColumnItem = props.columns.find(
      (col) => col.id === +target.dataset.columnId!
    );
    if (draggingColumnItem) {
      draggingColumnData.value = draggingColumnItem;
    }
    draggingColumnWidth.value = parseInt(getComputedStyle(target).width);

    draggingRowData.value = props.rows.map((row) => {
      const item = row.value.find(
        (cell) => cell.id === +target.dataset.columnId!
      );

      if (item) {
        return item;
      }

      return emptyDataEntry;
    });
  }
};

const onMouseMove = (e: Event) => {
  mouseMoving.value = true;

  const mouseEvent = e as MouseEvent;
  const target = e.target as HTMLElement;

  draggingColumnTableIndex.value = props.columns.findIndex(
    (col) => col.id === draggingColumnData.value.id
  );

  if (target) {
    const nodeName = target.tagName.toLowerCase();

    if (nodeName === "th" || nodeName === "td") {
      const index = +target.dataset.columnIndex!;
      const columnId = +target.dataset.columnId!;

      if (columnId !== draggingColumnData.value.id) {
        const xCenterPosMouseOverElement =
          target.getBoundingClientRect().x +
          parseInt(getComputedStyle(target).width) / 2;

        const inTargetCenterPositionThresholds =
          mousePosition.value.x > xCenterPosMouseOverElement - 10 &&
          mousePosition.value.x < xCenterPosMouseOverElement + 10;

        if (inTargetCenterPositionThresholds) {
          const resultArrColumns = [...props.columns].filter(
            (col) => col.id !== draggingColumnData.value.id
          );

          const resultArrRows = [...props.rows].map<DTableRow>((row) => {
            row.value = row.value.filter(
              (cell) => cell.id !== draggingColumnData.value.id
            );
            return row;
          });

          resultArrColumns.splice(index, 0, draggingColumnData.value);
          resultArrRows.forEach((row, rowIndex) => {
            row.value.splice(index, 0, draggingRowData.value[rowIndex]);
          });
          emit("update:columns", resultArrColumns);
          emit("update:rows", resultArrRows);
        }
      }
    }
  }
  mousePosition.value = {
    x: mouseEvent.pageX,
    y: mouseEvent.pageY
  };
};

const onMouseUp = (e: Event) => {
  mouseMoving.value = false;
  draggingColumnData.value = emptyDataEntry;
  document.removeEventListener("mousemove", onMouseMove);
};

useEventListener([
  { event: "mouseup", cb: onMouseUp, when: "both" },
  { event: "mousemove", cb: onMouseMove, when: "unmounted" }
]);
</script>

<template>
  <div class="d-table-wrapper">
    <table class="d-table">
      <thead>
        <tr>
          <th
            id="table_cell"
            v-for="(column, index) in columns"
            :key="column.id"
            :data-highlight="column.id === draggingColumnData.id"
            :data-column-id="column.id"
            :data-column-index="index"
            @mousedown.left="onMouseDown"
          >
            {{ column.value }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td
            id="table_cell"
            :key="entry.id"
            :data-highlight="entry.id === draggingColumnData.id"
            :data-column-id="entry.id"
            :data-column-index="index"
            v-for="(entry, index) in row.value"
          >
            {{ entry.value }}
          </td>
        </tr>
      </tbody>
    </table>
    <table
      class="d-table hidden"
      v-if="draggingColumnData.id !== -1 && mouseMoving"
      :style="{
        width: draggingColumnWidth + 'px',
        transform: `translate(${
          mousePosition.x + draggingColumnOffsetRelativeToMouse.x
        }px, ${mousePosition.y + draggingColumnOffsetRelativeToMouse.y}px)`
      }"
    >
      <thead>
        <tr>
          <th :key="draggingColumnData?.id">
            {{ draggingColumnData?.value }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in draggingRowData" :key="row.id">
          <td :key="row.id">
            {{ row.value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
#table_cell[data-highlight="true"] {
  background-color: lighten(#999, 30);
  border: none;
  color: lighten(#999, 30);
}
.d-table {
  * {
    box-sizing: border-box;
  }
}
.d-table-wrapper {
  overflow: auto;
  max-height: 400px;
  border-bottom: 1px solid #999;
}
.d-table {
  width: 100%;
  border: none;
  border-collapse: collapse;

  thead {
    tr {
      th {
        position: sticky;
        top: 0;
        z-index: 2;
        padding: 30px 15px;
        background: rgb(0, 6, 48);
        color: #fff;
        text-align: left;
        &:not([data-highlight="true"])::before {
          display: block;
          content: '';
          background: linear-gradient(180deg, #999, rgba(0, 0, 0, 0.0));
          position: absolute;
          bottom: -10px;
          left: 0;
          height: 10px;
          width: 100%;
        }
        &:first-child {
          border-top-width: 0px;
          border-left-width: 0px;
          border-top-left-radius: 10px;
        }
        &:last-child {
          border-top-width: 0px;
          border-left-width: 0px;
          border-top-right-radius: 10px;
        }
        cursor: grab;
        user-select: none;
        &:active {
          cursor: grabbing;
        }
      }
    }
  }
  tbody {
    tr {
      &:nth-child(2n) {
        td {
          background: lighten(#34b, 30);
        }
      }
      td {
        text-align: left;
        padding: 20px 15px;
      }
    }
  }
  &.hidden {
    width: auto;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 3;
    background-color: #fff;
    border: 3px solid #000;
    thead {
      tr {
        th {
          border-radius: 0;
        }
      }
    }
  }
}
</style>
