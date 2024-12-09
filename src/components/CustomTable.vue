<template>
  <div class="custom-table-wrapper">
    <table class="custom-table">
      <thead v-if="showHeader">
        <tr>
          <th v-for="(column, index) in columns" :key="index">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
          <td v-for="(column, colIndex) in columns" :key="colIndex">
            <div class="table-cell">
              <slot :name="column.prop" :row="row" :$index="rowIndex">
                {{ row[column.prop] }}
              </slot>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    required: true
  },
  showHeader: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.custom-table-wrapper {
  width: 100%;
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  color: var(--text-color);
}

.custom-table thead tr {
  background: linear-gradient(45deg, #2c3e50, #3498db);
}

.custom-table th {
  padding: 15px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 3px solid rgba(255, 255, 255, 0.1);
  color: #fff;
}

.custom-table td {
  padding: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  height: 50px;
}

.table-cell {
  height: 100%;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.custom-table tbody tr {
  transition: all 0.3s ease;
}

.custom-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.01);
}

.custom-table tbody tr:hover .table-cell {
  color: #3498db;
}

@keyframes glow {
  0% { box-shadow: 0 0 5px rgba(52, 152, 219, 0.5); }
  50% { box-shadow: 0 0 20px rgba(52, 152, 219, 0.8); }
  100% { box-shadow: 0 0 5px rgba(52, 152, 219, 0.5); }
}

.custom-table-wrapper:hover {
  animation: glow 2s infinite;
}
</style> 